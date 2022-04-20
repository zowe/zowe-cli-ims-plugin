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
import { ImsSession, IQueryTransactionParms, queryTransaction } from "../../../../../src";

let testEnvironment: ITestEnvironment<ITestPropertiesSchema>;
let imsConnectHost: string;
let session: ImsSession;
let route: string;
let systemMessageID: string;

describe("IMS query transaction", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_query_transaction",
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;
        route = imsProperties.route;
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

    const options: IQueryTransactionParms = {} as any;

    it("should query all transactions from IMS without options", async () => {
        let error;
        let response;

        try {
            response = await queryTransaction(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages[systemMessageID].command).toBe("QUERY TRAN");
    });

    it("should query all transactions from IMS using criteria", async () => {
        let error;
        let response;

        options.name = ["*"];
        options.attributes = ["ALL"];
        options.status = ["LCK"];
        try {
            response = await queryTransaction(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        for (const messageKey of Object.keys(response.messages)) {
            // should have no results and have a warning RC of 4
            expect(response.messages[messageKey].rc).toBe("00000004");
            expect(response.messages[messageKey].command).toBe("QUERY TRAN NAME(*) STATUS(LCK) SHOW(ALL)");
        }
    });

    it("should fail to query all transactions from IMS due to invalid attributes value", async () => {
        let error;
        let response;

        options.name = ["*"];
        options.attributes = ["A"];  // invalid value
        options.status = ["LCK"];

        try {
            response = await queryTransaction(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeTruthy();
        expect(response).toBeFalsy();
        expect(error.mDetails.msg).toContain("IMS Operations API Error");
    });

    it("should fail due to filter error", async () => {
        let error;
        let response;

        options.name = ["*"];
        options.attributes = ["ALL"];
        options.status = ["LCK"];
        options.qcntcomp = ["EQ"];
        options.qcntval = 1;
        options.class = [1];
        options.conv = "N";
        options.fp = "E";
        options.remote = "N";
        options.resp = "N";
        options.route = [route];

        try {
            response = await queryTransaction(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        for (const messageKey of Object.keys(response.messages)) {
            // should have no results and have a warning RC of 4
            expect(response.messages[messageKey].rc).toBe("00000008");
            expect(response.messages[messageKey].rsntxt) .toBe("No filter, an invalid filter, or insufficient # of filters specified");
            expect(response.messages[messageKey].command).toBe("QUERY TRAN NAME(*) CLASS(1) " +
                "QCNT(EQ,1) STATUS(LCK) SHOW(ALL) CONV(N) FP(E) REMOTE(N) RESP(N)");
        }
    });
});
