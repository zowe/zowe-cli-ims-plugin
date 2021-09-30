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

import { ImsConstants, ImsRestClient, ImsSession, IUpdateTransactionParms, startTransaction } from "../../../../src";

describe("IMS - Start transaction", () => {

    const transaction = "transaction";
    const route = "IMS1";
    const content = "This\nis\r\na\ntest";
    const plexName = "fakePlex";
    const startTransactionParms: IUpdateTransactionParms = {
        name: [transaction]
    };

    const dummySession = new ImsSession({
        user: "fake",
        password: "fake",
        hostname: "fake",
        port: 8080,
        imsConnectHost: "fake",
        imsConnectPort: 9999,
        plex: plexName
    });

    let error: any;
    let response: any;
    let endPoint: string;

    const deleteSpy = jest.spyOn(ImsRestClient, "putExpectJSON").mockReturnValue(content);

    beforeEach(() => {
        response = undefined;
        error = undefined;
        deleteSpy.mockClear();
        deleteSpy.mockImplementation(() => content);
    });

    describe("success scenarios", () => {

        it("should be able to start a transaction with name", async () => {

            endPoint = ImsConstants.URL + plexName + "/" + ImsConstants.TRANSACTION +
                "?name=" + transaction + "&" + ImsConstants.START + "=SCHD";

            response = await startTransaction(dummySession, startTransactionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });

        it("should be able to start a transaction with all parameters specified", async () => {

            startTransactionParms.start = ["Q", "SCHD", "TRACE"];
            startTransactionParms.route = [route];

            endPoint = ImsConstants.URL + plexName + "/" + ImsConstants.TRANSACTION +
                "?" + ImsConstants.NAME + "=" + transaction + "&" + ImsConstants.START + "=Q,SCHD,TRACE" +
                "&" + ImsConstants.ROUTE + "=" + route;

            response = await startTransaction(dummySession, startTransactionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });
    });

    describe("validation scenarios", () => {

        it("should throw error if no parms are defined", async () => {

            try {
                response = await startTransaction(dummySession, undefined);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toMatch(/Cannot read (property 'name' of undefined|properties of undefined \(reading 'name'\))/);
        });

        it("should fail if name is not defined", async () => {

            startTransactionParms.name = undefined;

            try {
                response = await startTransaction(dummySession, startTransactionParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: IMS transaction name is required");
        });

        it("should fail if names is not provided", async () => {

            startTransactionParms.name = [""];

            try {
                response = await startTransaction(dummySession, startTransactionParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: Required parameter 'IMS transaction name' must not be blank");
        });
    });
});
