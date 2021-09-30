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

import { ImsConstants, ImsRestClient, ImsSession, IStopRegionParms, stopRegion } from "../../../../src";

describe("IMS - Stop region", () => {

    const regNum = [1];
    const jobName = "job1";
    const abdump = "y";
    const transaction = "trans";
    const cancel = false;
    const content = "This\nis\r\na\ntest";
    const plexName = "fakeplex";
    const stopRegionParms: IStopRegionParms = {
        reg_num: [1],
        job_name: undefined,
        abdump: undefined,
        transaction: undefined,
        cancel: undefined
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

        it("should be able to stop a region with reg_num", async () => {

            endPoint = ImsConstants.URL + dummySession.plex + "/" + ImsConstants.REGION +
                "/" + ImsConstants.STOP + "?reg_num=" + regNum[0];

            response = await stopRegion(dummySession, stopRegionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });

        it("should be able to stop a region with job_name", async () => {

            stopRegionParms.reg_num = undefined;
            stopRegionParms.job_name = jobName;

            endPoint = ImsConstants.URL + dummySession.plex + "/" + ImsConstants.REGION +
                "/" + ImsConstants.STOP + "?job_name=" + jobName;

            response = await stopRegion(dummySession, stopRegionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });

        it("should be able to stop a region with all parameters specified via job_name", async () => {

            stopRegionParms.reg_num = undefined;
            stopRegionParms.job_name = jobName;
            stopRegionParms.abdump = abdump;
            stopRegionParms.transaction = transaction;
            stopRegionParms.cancel = cancel;
            stopRegionParms.route = ["route"];

            endPoint = ImsConstants.URL + dummySession.plex + "/" + ImsConstants.REGION +
                "/" + ImsConstants.STOP + "?job_name=" + jobName + "&abdump=" + abdump + "&transaction=" + transaction +
                "&cancel=" + cancel + "&route=route";

            response = await stopRegion(dummySession, stopRegionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });

        it("should be able to stop a region with all parameters specified via reg_num", async () => {

            stopRegionParms.reg_num = regNum;
            stopRegionParms.job_name = undefined;
            stopRegionParms.abdump = abdump;
            stopRegionParms.transaction = transaction;
            stopRegionParms.cancel = cancel;

            endPoint = ImsConstants.URL + dummySession.plex + "/" + ImsConstants.REGION +
                "/" + ImsConstants.STOP + "?reg_num=" + regNum[0] + "&abdump=" + abdump +
                "&transaction=" + transaction + "&cancel=" + cancel + "&route=route";

            response = await stopRegion(dummySession, stopRegionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });
    });

    describe("validation scenarios", () => {

        it("should throw error if no parms are defined", async () => {

            try {
                response = await stopRegion(dummySession, undefined);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toMatch(/Cannot read (property 'reg_num' of undefined|properties of undefined \(reading 'reg_num'\))/);
        });

        it("should fail if reg_num and job_name are undefined", async () => {

            stopRegionParms.reg_num = undefined;
            stopRegionParms.job_name = undefined;

            try {
                response = await stopRegion(dummySession, stopRegionParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: Either region number or job name (but not both) must be specified.");
        });

        it("should fail if reg_num and job_name are not provided", async () => {

            stopRegionParms.reg_num = undefined;
            stopRegionParms.job_name = "";

            try {
                response = await stopRegion(dummySession, stopRegionParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: Required parameter 'If job name is specified it must have a value.");
        });

        it("should fail if both reg_num and job_name are provided", async () => {

            stopRegionParms.reg_num = [1];
            stopRegionParms.job_name = "job1";

            try {
                response = await stopRegion(dummySession, stopRegionParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: Either region number or job name (but not both) must be specified.");
        });
    });
});
