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
import { updateTransaction, IUpdateTransactionParms, ImsSession } from "../../../../../src";

let testEnvironment: ITestEnvironment<ITestPropertiesSchema>;
let imsConnectHost: string;
let session: ImsSession;
let route: string;
let transaction: string;
let programWildCard: string;
let systemMessageID: string;

describe("IMS update transaction", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_update_transaction",
            installPlugin: true,
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;
        route = imsProperties.route;
        transaction = imsProperties.transaction;
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

    const options: IUpdateTransactionParms = {} as any;

    it("should update transaction by transaction name  and set 'lock' OFF", async () => {
        let error;
        let response;

        options.name = [transaction];
        options.lock = "OFF";

        try {
            response = await updateTransaction(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages[systemMessageID].command).toContain("UPDATE TRAN NAME(" + transaction.toUpperCase() + ") SET(LOCK(OFF))");
    });

    it("should update multiple transactions by transaction name and use multiple update options", async () => {
        let error;
        let response;

        options.name = ["D*", "IV*"];
        options.lock = "OFF";

        try {
            response = await updateTransaction(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages[systemMessageID].command).toContain("UPDATE TRAN NAME(D*, IV*) SET(LOCK(OFF))");
    });

    it("should update multiple transactions by transaction name and use route", async () => {
        let error;
        let response;

        options.name = [programWildCard];
        options.lock = "OFF";
        options.route = [route];

        try {
            response = await updateTransaction(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.data[0].cc).toBe("0");
        expect(response.messages[systemMessageID].command).toContain("UPDATE TRAN NAME(" + programWildCard.toUpperCase() + ") SET(LOCK(OFF))");
    });
});
