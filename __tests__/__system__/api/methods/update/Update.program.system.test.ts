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
import { updateProgram, IUpdateProgramParms, ImsSession } from "../../../../../src";

let testEnvironment: ITestEnvironment;
let imsConnectHost: string;
let session: ImsSession;
let program: string;
let route: string;
let programWildCard: string;

describe("IMS update program", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_update_program",
            installPlugin: true,
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;
        program = imsProperties.programName;
        route = imsProperties.route;
        programWildCard = imsProperties.programWildCard;

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

    it("should update program by program name and set 'lock' OFF", async () => {
        let error;
        let response;

        options.names = [program];
        options.lock = "OFF";

        try {
            response = await updateProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages["OM1OM   "].command).toContain("UPDATE PGM NAME(" + program.toUpperCase() + ") SET(LOCK(OFF))");
    });

    it("should update program by program name and set 'lock' OFF and route command", async () => {
        let error;
        let response;

        options.names = [program];
        options.lock = "OFF";
        options.route = [route];

        try {
            response = await updateProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages["OM1OM   "].command).toContain("UPDATE PGM NAME(" + program.toUpperCase() + ") SET(LOCK(OFF))");
    });

    it("should update multiple programs by program name and set 'lock' OFF and route command", async () => {
        let error;
        let response;

        options.names = [programWildCard];
        options.lock = "OFF";
        options.route = [route];

        try {
            response = await updateProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages["OM1OM   "].command).toContain("UPDATE PGM NAME(" + programWildCard + ") SET(LOCK(OFF))");
    });

});
