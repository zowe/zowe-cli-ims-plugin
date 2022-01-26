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

import {
    ImsConstants,
    ImsRestClient,
    ImsSession,
    queryTransaction,
    IQueryTransactionParms
} from "../../../../src";

describe("IMS - Query transaction", () => {

    const transaction = "transaction";
    const attributes = "ALL";
    const content = "This\nis\r\na\ntest";

    const queryTransactionParms: IQueryTransactionParms = {
        name: [transaction],
        attributes: [attributes],
        status: undefined,
        route: undefined
    };

    const dummySession = new ImsSession({
        user: "fake",
        password: "fake",
        hostname: "fake",
        port: 8080,
        imsConnectHost: "fake",
        imsConnectPort: 9999,
        plex: "fake"
    });

    let error: any;
    let response: any;
    let endPoint: string;

    describe("success scenarios", () => {

        const deleteSpy = jest.spyOn(ImsRestClient, "getExpectJSON").mockReturnValue(content);

        beforeEach(() => {
            response = undefined;
            error = undefined;
            deleteSpy.mockClear();
            deleteSpy.mockImplementation(() => content);
        });

        it("should be able to query all transactions without any parameters", async () => {

            // if no parameters, then /ims/apis/v1/transaction which
            // returns all transactions with all columns
            endPoint = ImsConstants.URL + dummySession.plex + "/" + ImsConstants.TRANSACTION;

            response = await queryTransaction(dummySession);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint);
        });

        it("should be able to query all transactions without transaction name specified", async () => {
            endPoint = ImsConstants.URL + dummySession.plex + "/" + ImsConstants.TRANSACTION +
                "?attributes=" + attributes;

            queryTransactionParms.name = undefined;
            // queryTransactionParms.attributes = ["BMPTYPE"];

            response = await queryTransaction(dummySession, queryTransactionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint);
        });

        it("should be able to query a transaction with all optional parameters specified", async () => {
            endPoint = ImsConstants.URL + dummySession.plex + "/" + ImsConstants.TRANSACTION +
                "?name=trans1&attributes=" + attributes + "&status=status&route=route&class=1&conv=conv&fp=fp&qcntcomp=qcnt&qcntval=1&"
                + "remote=remote&resp=resp";

            queryTransactionParms.name = ["trans1"];
            queryTransactionParms.attributes = [attributes];
            queryTransactionParms.class = [1];
            queryTransactionParms.conv = "conv";
            queryTransactionParms.fp = "fp";
            queryTransactionParms.qcntcomp = ["qcnt"];
            queryTransactionParms.qcntval = 1;
            queryTransactionParms.remote = "remote";
            queryTransactionParms.resp = "resp";
            queryTransactionParms.route = ["route"];
            queryTransactionParms.status = ["status"];

            response = await queryTransaction(dummySession, queryTransactionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint);
        });
    });
});
