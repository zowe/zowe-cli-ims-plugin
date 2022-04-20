/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at *
* https://www.eclipse.org/legal/epl-v20.html                                      *
*                                                                                 *
* SPDX-License-Identifier: EPL-2.0                                                *
*                                                                                 *
* Copyright Contributors to the Zowe Project.                                     *
*                                                                                 *
*/

import { ITestEnvironment, TestEnvironment } from "@zowe/cli-test-utils";
import { ITestPropertiesSchema } from "../../../../__src__/doc/ITestPropertiesSchema";
import { ImsSession, IQueryRegionParms, queryRegion } from "../../../../../src";

let testEnvironment: ITestEnvironment<ITestPropertiesSchema>;
let imsConnectHost: string;
let session: ImsSession;
let imsRoute: string;
let systemMessageID: string;

describe("IMS query region", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_query_region",
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;
        imsRoute = imsProperties.route;
        systemMessageID = imsProperties.systemMessageID;

        session = new ImsSession({
            user: imsProperties.user,
            password: imsProperties.password,
            hostname: imsProperties.host,
            port: imsProperties.port,
            imsConnectHost: testEnvironment.systemTestProperties.ims.imsConnectHost,
            imsConnectPort: testEnvironment.systemTestProperties.ims.imsConnectPort,
            plex: testEnvironment.systemTestProperties.ims.plex,
            type: "basic",
            strictSSL: false,
            protocol: "http",
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    const options: IQueryRegionParms = {} as any;

    it("should query all regions from IMS without options", async () => {
        let error;
        let response;

        try {
            response = await queryRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages[systemMessageID].command).toBe("(DIS ACT REGION) OPTION=AOPOUTPUT");
    });

    it("should query all regions from IMS using criteria", async () => {
        let error;
        let response;

        options.dc = true;
        options.region = true;

        try {
            response = await queryRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages[systemMessageID].command).toBe("(DIS ACT REGION) OPTION=AOPOUTPUT");
    });

    it("should query all regions from IMS with valid route", async () => {
        let error;
        let response;

        options.dc = true;
        options.region = true;
        options.route = [imsRoute];

        try {
            response = await queryRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages[systemMessageID].command).toBe("(DIS ACT REGION) OPTION=AOPOUTPUT");
    });

    it("should fail to query all regions from IMS due to invalid route", async () => {
        let error;
        let response;

        options.dc = true;
        options.region = true;
        options.route = ["FAKE"];

        try {
            response = await queryRegion(session, options);
        } catch (err) {
            error = err;
        }

        for (const messageKey of Object.keys(response.messages)) {
            // expect to get a rc 4 back which indicates no results
            expect(response.messages[messageKey].rc).toBe("02000010");
            expect(response.messages[messageKey].rsntxt).toBe("The system required to process this command is not registered.");
            expect(response.messages[messageKey].command).toBe("(DIS ACT REGION) OPTION=AOPOUTPUT");
        }
    });
});
