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
    stopRegion,
    IStopRegionParms
} from "../../../../src";

describe("IMS - Stop region", () => {

    const regNum = [1];
    const jobName = "job1";
    const abdump = "y";
    const transaction = "trans";
    const cancel = false;
    const content = "This\nis\r\na\ntest";

    const stopRegionParms: IStopRegionParms = {
        regNum: [1],
        jobName: undefined,
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

        it("should be able to stop a region with regNum", async () => {

            endPoint = ImsConstants.URL + ImsConstants.REGION + "/" + ImsConstants.STOP +
                "?regNum=" + regNum[0];

            response = await stopRegion(dummySession, stopRegionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });

        it("should be able to stop a region with jobName", async () => {

            stopRegionParms.regNum = undefined;
            stopRegionParms.jobName = jobName;

            endPoint = ImsConstants.URL + ImsConstants.REGION + "/" + ImsConstants.STOP +
                "?jobname=" + jobName;

            response = await stopRegion(dummySession, stopRegionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });

        it("should be able to stop a region with all parameters specified via jobName", async () => {

            stopRegionParms.regNum = undefined;
            stopRegionParms.jobName = jobName;
            stopRegionParms.abdump = abdump;
            stopRegionParms.transaction = transaction;
            stopRegionParms.cancel = cancel;

            endPoint = ImsConstants.URL + ImsConstants.REGION + "/" + ImsConstants.STOP +
                "?jobname=" + jobName + "&abdump=" + abdump + "&transaction=" + transaction +
                "&cancel=" + cancel;

            response = await stopRegion(dummySession, stopRegionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint, [], undefined);
        });

        it("should be able to stop a region with all parameters specified via regNum", async () => {

            stopRegionParms.regNum = regNum;
            stopRegionParms.jobName = undefined ;
            stopRegionParms.abdump = abdump;
            stopRegionParms.transaction = transaction;
            stopRegionParms.cancel = cancel;

            endPoint = ImsConstants.URL + ImsConstants.REGION + "/" + ImsConstants.STOP +
                "?regNum=" + regNum[0] + "&abdump=" + abdump + "&transaction=" + transaction +
                "&cancel=" + cancel;

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
            expect(error.message).toContain("Cannot read property 'regNum' of undefined");
        });

        it("should fail if regNum and jobName are not provided", async () => {

            stopRegionParms.regNum = undefined;
            stopRegionParms.jobName = undefined;

            try {
                response = await stopRegion(dummySession, stopRegionParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: Either region number or job name (but not both) must be specified.");
        });

        it("should fail if regNum and jobName are not provided", async () => {

            stopRegionParms.regNum = undefined;
            stopRegionParms.jobName = "";

            try {
                response = await stopRegion(dummySession, stopRegionParms);
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Expect Error: Required parameter 'If job name is specified it must have a value.");
        });

        it("should fail if both regNum and jobName are provided", async () => {

            stopRegionParms.regNum = [1];
            stopRegionParms.jobName = "job1";

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
