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

import { ImsConstants, ImsRestClient, ImsSession, IUpdateProgramParms, startProgram } from "../../../../src";

describe("IMS - Start program", () => {

    const program = "program";
    const route = "IMS1";
    const content = "This\nis\r\na\ntest";
    const plexName = "fakePlex";
    const startProgramParms: IUpdateProgramParms = {
        names: [program]
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

        it("should be able to start a program with name", async () => {

            endPoint = ImsConstants.URL + plexName + "/" + ImsConstants.PROGRAM +
                "?" + ImsConstants.NAMES + "=" + program + "&" + ImsConstants.START + "=SCHD";

            response = await startProgram(dummySession, startProgramParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });

        it("should be able to start a program with all parameters specified", async () => {

            startProgramParms.start = ["Q", "SCHD", "TRACE"];
            startProgramParms.route = ["IMS1"];

            endPoint = ImsConstants.URL + plexName + "/" + ImsConstants.PROGRAM +
                "?" + ImsConstants.NAMES + "=" + program + "&" + ImsConstants.START + "=Q,SCHD,TRACE" +
                "&" + ImsConstants.ROUTE + "=" + route;

            response = await startProgram(dummySession, startProgramParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });
    });

    describe("validation scenarios", () => {

        it("should throw error if no parms are defined", async () => {

            try {
                response = await startProgram(dummySession, undefined);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Cannot read property 'names' of undefined");
        });

        it("should fail if names is not defined", async () => {

            startProgramParms.names = undefined;

            try {
                response = await startProgram(dummySession, startProgramParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: IMS program name is required");
        });

        it("should fail if names is not provided", async () => {

            startProgramParms.names = [""];

            try {
                response = await startProgram(dummySession, startProgramParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: Required parameter 'IMS program name' must not be blank");
        });
    });
});
