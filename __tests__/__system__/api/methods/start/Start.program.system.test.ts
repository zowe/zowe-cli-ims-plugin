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
import { startProgram, IUpdateProgramParms, ImsSession } from "../../../../../src";

let testEnvironment: ITestEnvironment;
let imsConnectHost: string;
let session: ImsSession;
let program: string;
let route: string;
let programWildCard: string;
let systemMessageID: string;

describe("IMS start program", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_start_program",
            installPlugin: true,
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;
        program = imsProperties.programName;
        route = imsProperties.route;
        programWildCard = imsProperties.programWildCard;
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

    const options: IUpdateProgramParms = {} as any;

    it("should start program by program name and default to start option SCHD if undefined", async () => {
        let error;
        let response;

        options.name = [program];

        try {
            response = await startProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages[systemMessageID].command).toContain("UPDATE PGM NAME(" + program + ") START(SCHD)");
    });

    it("should start program by program name and use multiple start options", async () => {
        let error;
        let response;

        options.name = [program];
        options.start = ["SCHD", "TRACE"];
        options.route = [route];

        try {
            response = await startProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages[systemMessageID].command).toContain("UPDATE PGM NAME(" + program + ") START(SCHD, TRACE)");
    });

    it("should start multiple programs by program name", async () => {
        let error;
        let response;

        options.name = [programWildCard];
        options.start = ["SCHD"];
        options.route = [route];

        try {
            response = await startProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages[systemMessageID].command).toContain("UPDATE PGM NAME(" + programWildCard + ") START(SCHD)");
    });

});
