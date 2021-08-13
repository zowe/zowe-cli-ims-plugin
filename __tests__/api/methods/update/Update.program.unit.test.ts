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

import { ImsConstants, ImsRestClient, ImsSession, IUpdateProgramParms, updateProgram } from "../../../../src";

describe("IMS - Update program", () => {

    const program = "program";
    const route = "IMS1";
    const content = "This\nis\r\na\ntest";
    const plexName = "fakePlex";
    const updateProgramParms: IUpdateProgramParms = {
        name: [program]
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

        it("should be able to update a program with all parameters specified", async () => {

            updateProgramParms.bmptype = "N";
            updateProgramParms.dopt = "N";
            updateProgramParms.fp = "E";
            updateProgramParms.gpsb = "N";
            updateProgramParms.lang = "ASSEM";
            updateProgramParms.lock = "ON";
            updateProgramParms.resident = "N";
            updateProgramParms.schdtype = "SERIAL";
            updateProgramParms.transtat = "N";
            updateProgramParms.option = "ALLRSP";
            updateProgramParms.route = ["IMS1", "IMS2"];

            endPoint = ImsConstants.URL + plexName + "/" + ImsConstants.PROGRAM +
                "?" + ImsConstants.NAME + "=" + program + "&bmptype=N&dopt=N&fp=E&gpsb=N&lang=ASSEM&lock=ON" +
                "&resident=N&schdtype=SERIAL&transtat=N&option=ALLRSP&route=IMS1,IMS2";

            response = await updateProgram(dummySession, updateProgramParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });
    });

    describe("validation scenarios", () => {

        it("should throw error if no parms are defined", async () => {

            try {
                response = await updateProgram(dummySession, undefined);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Cannot read property 'name' of undefined");
        });

        it("should fail if name is not defined", async () => {

            updateProgramParms.name = undefined;

            try {
                response = await updateProgram(dummySession, updateProgramParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: IMS program name is required");
        });

        it("should fail if name is not provided", async () => {

            updateProgramParms.name = [""];

            try {
                response = await updateProgram(dummySession, updateProgramParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: Required parameter 'IMS program name' must not be blank");
        });
    });
});
