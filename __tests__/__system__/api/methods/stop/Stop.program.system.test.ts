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

import { Session } from "@brightside/imperative";
import { ITestEnvironment } from "../../../../__src__/environment/doc/response/ITestEnvironment";
import { TestEnvironment } from "../../../../__src__/environment/TestEnvironment";
import { stopProgram, IUpdateProgramParms, ImsSession, startTransaction } from "../../../../../src";

let testEnvironment: ITestEnvironment;
let imsConnectHost: string;
let session: ImsSession;
let route: string;
let program: string;

describe("IMS stop program", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_stop_program",
            installPlugin: true,
            tempProfileTypes: ["ims"]
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;
        route = imsProperties.route;
        program = imsProperties.programName;

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

    const options: IUpdateProgramParms = {} as any;

    it("should stop program* by program name and default to stop option SCHD if undefined", async () => {
        let error;
        let response;

        options.names = [program];

        try {
            response = await stopProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages["OM1OM   "].command).toContain("UPDATE PGM NAME(" + program + ") STOP(SCHD)");
    });

    it("should stop multiple programs by program name and use multiple stop options", async () => {
        let error;
        let response;

        options.names = ["D*", "IV*"];
        options.stop = ["SCHD", "TRACE"];

        try {
            response = await stopProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages["OM1OM   "].command).toContain("UPDATE PGM NAME(D*, IV*) STOP(SCHD, TRACE)");
    });

    it("should stop multiple programs by program name and use route", async () => {
        let error;
        let response;

        options.names = ["D*", "IV*"];
        options.stop = ["SCHD"];
        options.route = [route];

        try {
            response = await stopProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages["OM1OM   "].command).toContain("UPDATE PGM NAME(D*, IV*) STOP(SCHD)");
    });
});
