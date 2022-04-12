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
import { ImsSession, IStartRegionParms, startRegion } from "../../../../../src";

let testEnvironment: ITestEnvironment<ITestPropertiesSchema>;
let imsConnectHost: string;
let session: ImsSession;
let memberName: string;
let systemMessageID: string;

describe("IMS start region", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_start_region",
            installPlugin: true,
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;
        memberName = imsProperties.dependentRegionName;
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

    const options: IStartRegionParms = {} as any;

    it("should start region by memberName", async () => {
        let error;
        let response;

        options.memberName = memberName;

        try {
            response = await startRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages[systemMessageID].command).toContain("START REGION " + memberName);
    });

    // TODO - IBM NEEDS TO EXPLAIN HOW JOBNAME WORKS
    it("should start region by memberName with job_name specified", async () => {
        let error;
        let response;

        options.memberName = memberName;
        options.job_name = "JOBNAME";

        try {
            response = await startRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        for (const messageKey of Object.keys(response.messages)) {
            // expect to get a rc 4 back which indicates no results
            expect(response.messages[messageKey].rc).toBe("00000014");
            expect(response.messages[messageKey].command).toBe("(START REGION " + memberName + " JOBNAME JOBNAME ) OPTION=AOPOUTPUT");
        }
    });

    it("should fail to start region due to an undefined memberName value", async () => {
        let error;
        let response;

        options.memberName = undefined;

        try {
            response = await startRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeTruthy();
        expect(response).toBeFalsy();
        expect(error.mDetails.msg).toContain("IMS member name is required");
    });

    it("should fail to start region due to an empty memberName value", async () => {
        let error;
        let response;

        options.memberName = "";

        try {
            response = await startRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeTruthy();
        expect(response).toBeFalsy();
        expect(error.mDetails.msg).toContain("Required parameter 'IMS member name' must not be blank");
    });
});
