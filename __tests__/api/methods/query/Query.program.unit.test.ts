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
import {
    ImsConstants,
    ImsRestClient,
    ImsSession,
    queryProgram,
    IQueryProgramParms
} from "../../../../src";

describe("CMCI - Get resource", () => {

    const program = "program";
    const attributes = "ALL";
    const content = "This\nis\r\na\ntest";

    const queryProgramParms: IQueryProgramParms = {
        names: [program],
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

        it("should be able to query all programs without any parameters", async () => {

            // if no parameters, then /ims/apis/v1/program?attributes=ALL which
            // returns all programs with all columns
            endPoint = ImsConstants.URL + ImsConstants.PROGRAM +
                "?attributes=" + attributes;

            response = await queryProgram(dummySession);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, []);
        });

        it("should be able to query all programs without program name specified", async () => {
            endPoint = ImsConstants.URL + ImsConstants.PROGRAM +
                "?attributes=BMPTYPE";

            queryProgramParms.names = undefined;
            queryProgramParms.attributes = ["BMPTYPE"];

            response = await queryProgram(dummySession, queryProgramParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, []);
        });
    });
});
