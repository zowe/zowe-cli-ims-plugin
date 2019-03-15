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

import { Session } from "@zowe/imperative";
import { ITestEnvironment } from "../../../../__src__/environment/doc/response/ITestEnvironment";
import { TestEnvironment } from "../../../../__src__/environment/TestEnvironment";
import { stopTransaction, IUpdateTransactionParms, ImsSession, stopProgram } from "../../../../../src";

let testEnvironment: ITestEnvironment;
let imsConnectHost: string;
let session: ImsSession;
let transactionName: string;
let route: string;

describe("IMS stop transaction", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_stop_transaction",
            installPlugin: true,
            tempProfileTypes: ["ims"]
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;
        transactionName = imsProperties.transaction;
        route = imsProperties.route;

        session = new ImsSession({
            user: imsProperties.user,
            password: imsProperties.password,
            hostname: imsProperties.host,
            port: imsProperties.port,
            imsConnectHost: imsProperties.imsConnectHost,
            imsConnectPort: imsProperties.imsConnectPort,
            plex: imsProperties.plex,
            type: "basic",
            strictSSL: false,
            protocol: "http",
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    const options: IUpdateTransactionParms = {} as any;

    it("should stop transaction by transaction name and default to stop option SCHD if undefined", async () => {
        let error;
        let response;

        options.names = [transactionName];

        try {
            response = await stopTransaction(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages["OM1OM   "].command).toContain("UPDATE TRAN NAME(" + transactionName + ") STOP(SCHD)");
    });

    it("should stop multiple transactions by transaction name and use multiple stop options", async () => {
        let error;
        let response;

        options.names = ["D*", "IV*"];
        options.stop = ["SCHD", "TRACE"];

        try {
            response = await stopTransaction(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages["OM1OM   "].command).toContain("UPDATE TRAN NAME(D*, IV*) STOP(SCHD, TRACE)");
    });

    it("should stop multiple transaction by transaction name and use route", async () => {
        let error;
        let response;

        options.names = ["D*", "IV*"];
        options.stop = ["SCHD"];
        options.route = [route];

        try {
            response = await stopTransaction(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages["OM1OM   "].command).toContain("UPDATE TRAN NAME(D*, IV*) STOP(SCHD)");
    });

});
