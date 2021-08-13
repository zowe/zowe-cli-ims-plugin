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
    startRegion,
    IStartRegionParms
} from "../../../../src";

describe("IMS - Start region", () => {

    const member = "member";
    const local = false;
    const content = "This\nis\r\na\ntest";

    const startRegionParms: IStartRegionParms = {
        memberName: member,
        local: undefined,
        job_name: undefined
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

    const deleteSpy = jest.spyOn(ImsRestClient, "putExpectJSON").mockReturnValue(content);

    beforeEach(() => {
        response = undefined;
        error = undefined;
        deleteSpy.mockClear();
        deleteSpy.mockImplementation(() => content);
    });

    describe("success scenarios", () => {

        it("should be able to start a region with memberName", async () => {

            endPoint = ImsConstants.URL + dummySession.plex + "/" + ImsConstants.REGION + "/" + ImsConstants.START +
                "?member_name=" + member;

            response = await startRegion(dummySession, startRegionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });

        it("should be able to start a region with all parameters specified", async () => {

            startRegionParms.local = false;
            startRegionParms.job_name = "job";
            startRegionParms.route = ["route"];

            endPoint = ImsConstants.URL + dummySession.plex + "/" + ImsConstants.REGION + "/" + ImsConstants.START +
                "?member_name=" + member + "&job_name=job&local=false&route=route";

            response = await startRegion(dummySession, startRegionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });
    });

    describe("validation scenarios", () => {

        it("should throw error if no parms are defined", async () => {

            try {
                response = await startRegion(dummySession, undefined);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Cannot read property 'memberName' of undefined");
        });

        it("should fail if memberName is undefined", async () => {

            startRegionParms.memberName = undefined;

            try {
                response = await startRegion(dummySession, startRegionParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: IMS member name is required");
        });

        it("should fail if memberName is empty", async () => {

            startRegionParms.memberName = "";

            try {
                response = await startRegion(dummySession, startRegionParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: Required parameter 'IMS member name' must not be blank");
        });
    });
});
