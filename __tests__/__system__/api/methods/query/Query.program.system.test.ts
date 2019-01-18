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
import { queryProgram, IQueryProgramParms, ImsSession} from "../../../../../src";

let testEnvironment: ITestEnvironment;
let imsConnectHost: string;
let session: Session;

describe("IMS Query program", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_query_program",
            installPlugin: true,
            tempProfileTypes: ["ims"]
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;

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
        expect(response.messages["OM1OM   "].rc).toBe("00000000");
        expect(response.messages["OM1OM   "].command).toBe("QUERY PGM SHOW(ALL)");
    });

    it("should query all programs from IMS using criteria", async () => {
        let error;
        let response;

        options.names = ["*"];
        options.attributes = ["ALL"];
        options.status = ["LOCK"];
        try {
            response = await queryProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages.IMSN.rc).toBe("00000004");
        expect(response.messages.IMSN.command).toBe("QUERY PGM NAME(*) SHOW(ALL) STATUS(LOCK)");
    });

    it("should fail to query all programs from IMS due to invalid attributes value", async () => {
        let error;
        let response;

        options.names = ["*"];
        options.attributes = ["A"];
        options.status = ["LOCK"];

        try {
            response = await queryProgram(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeTruthy();
        expect(response).toBeFalsy();
        expect(error.mDetails.msg).toContain("IMS REST API Error");
    });
});
