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

import { ITestEnvironment } from "../../../../__src__/environment/doc/response/ITestEnvironment";
import { TestEnvironment } from "../../../../__src__/environment/TestEnvironment";
import { ImsSession, IQueryProgramParms, queryProgram } from "../../../../../src";

let testEnvironment: ITestEnvironment;
let imsConnectHost: string;
let session: ImsSession;
let route: string;

describe("IMS query program", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_query_program",
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;
        route = imsProperties.route;

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

    const options: IQueryProgramParms = {} as any;

    it("should query all programs from IMS without options", async () => {
        let error;
        let response;

        try {
            response = await queryProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages["OM1OM   "].command).toBe("QUERY PGM SHOW(ALL)");
    });

    it("should query all programs from IMS using criteria", async () => {
        let error;
        let response;

        options.name = ["*"];
        options.attributes = ["ALL"];
        options.status = ["LOCK"];
        options.route = [route];
        try {
            response = await queryProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        for (const messageKey of Object.keys(response.messages)) {
            // expect to get a rc 4 back which indicates no results
            expect(response.messages[messageKey].rc).toBe("00000004");
            expect(response.messages[messageKey].command).toBe("QUERY PGM NAME(*) SHOW(ALL) STATUS(LOCK)");
        }
    });

    it("should fail to query all programs from IMS due to invalid attributes value", async () => {
        let error;
        let response;

        options.name = ["*"];
        options.attributes = ["A"];  // invalid value
        options.status = ["LOCK"];

        try {
            response = await queryProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeTruthy();
        expect(response).toBeFalsy();
        expect(error.mDetails.msg).toContain("IMS Operations API Error");
    });
});
