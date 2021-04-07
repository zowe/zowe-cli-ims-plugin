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

import { ImsConstants, ImsRestClient, ImsSession, IUpdateTransactionParms, updateTransaction } from "../../../../src";

describe("IMS - Update transaction", () => {

    const transaction = "transaction";
    const route = "IMS1";
    const content = "This\nis\r\na\ntest";
    const plexName = "fakePlex";
    const updateTransactionParms: IUpdateTransactionParms = {
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

        it("should be able to update a transaction with all parameters specified", async () => {

            const THREE = 3;

            updateTransactionParms.class = [THREE];
            updateTransactionParms.scope = ["ALL"];
            updateTransactionParms.aocmd = "N";
            updateTransactionParms.setClass = THREE;
            updateTransactionParms.cmtmode = "MULT";
            updateTransactionParms.conv = "Y";
            updateTransactionParms.cpri = THREE;
            updateTransactionParms.dclwa = "N";
            updateTransactionParms.dirroute = "N";
            updateTransactionParms.editrtn = "A";
            updateTransactionParms.edituc = "N";
            updateTransactionParms.emhbsz = THREE;
            updateTransactionParms.exprtime = THREE;
            updateTransactionParms.fp = "E";
            updateTransactionParms.inq = "N";
            updateTransactionParms.lct = THREE;
            updateTransactionParms.lpri = THREE;
            updateTransactionParms.lock = "ON";
            updateTransactionParms.maxrgn = THREE;
            updateTransactionParms.msgtype = "MULTSEG";
            updateTransactionParms.msname = "name";
            updateTransactionParms.npri = THREE;
            updateTransactionParms.parlim = THREE;
            updateTransactionParms.pgm = "pgm";
            updateTransactionParms.plct = THREE;
            updateTransactionParms.plcttime = THREE;
            updateTransactionParms.recover = "Y";
            updateTransactionParms.remote = "N";
            updateTransactionParms.resp  = "N";
            updateTransactionParms.segno = THREE;
            updateTransactionParms.segsz = THREE;
            updateTransactionParms.serial = "N";
            updateTransactionParms.sidl = THREE;
            updateTransactionParms.sidr = THREE;
            updateTransactionParms.spasz = THREE;
            updateTransactionParms.spatrunc = "S";
            updateTransactionParms.transtat = "N";
            updateTransactionParms.wfi = "Y";
            updateTransactionParms.option = "ALLRSP";
            updateTransactionParms.route = ["IMS1", "IMS2"];

            endPoint = ImsConstants.URL + plexName + "/" + ImsConstants.TRANSACTION +
                "?" + ImsConstants.NAME + "=" + transaction + "&class=3&scope=ALL&aocmd=N&setClass=3&cmtmode=MULT&conv=Y" +
                "&cpri=3&dclwa=N&dirroute=N&editrtn=A&edituc=N&emhbsz=3&exprtime=3&fp=E&inq=N&lct=3&lpri=3&lock=ON&maxrgn=3" +
                "&msgtype=MULTSEG&msname=name&npri=3&parlim=3&pgm=pgm&plct=3&plcttime=3&recover=Y&remote=N&resp=N" +
                "&segno=3&segsz=3&serial=N&sidl=3&sidr=3&spasz=3&spatrunc=S&transtat=N&wfi=Y&option=ALLRSP&route=IMS1,IMS2";
            response = await updateTransaction(dummySession, updateTransactionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });
    });

    describe("validation scenarios", () => {

        it("should throw error if no parms are defined", async () => {

            try {
                response = await updateTransaction(dummySession, undefined);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Cannot read property 'name' of undefined");
        });

        it("should fail if names is not defined", async () => {

            updateTransactionParms.name = undefined;

            try {
                response = await updateTransaction(dummySession, updateTransactionParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: IMS transaction name is required");
        });

        it("should fail if names is not provided", async () => {

            updateTransactionParms.name = [""];

            try {
                response = await updateTransaction(dummySession, updateTransactionParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: Required parameter 'IMS transaction name' must not be blank");
        });
    });
});
