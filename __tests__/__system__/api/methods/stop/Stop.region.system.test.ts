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
import { ITestEnvironment } from "../../../../__src__/environment/doc/response/ITestEnvironment";
import { TestEnvironment } from "../../../../__src__/environment/TestEnvironment";
import { stopRegion, IStopRegionParms, ImsSession, startRegion, IStartRegionParms } from "../../../../../src";

let testEnvironment: ITestEnvironment;
let imsConnectHost: string;
let session: Session;

describe("IMS Stop region", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_stop_region",
            installPlugin: true,
            tempProfileTypes: ["ims"]
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;

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

    const options: IStopRegionParms = {} as any;

    // NOTE: region must be started manually at this point
    it("should stop region by regNum (region id)", async () => {
        let error;
        let response;

        options.regNum= [1];

        try {
            response = await stopRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages["OM1OM   "].rc).toBe("00000000");
        expect(response.messages["OM1OM   "].command).toContain("STOP REGION 1");
    });

    // NOTE: region must be started manually at this point
    it("should stop region by jobName", async () => {
        let error;
        let response;

        options.regNum = undefined;
        options.jobName = "IMJJPP1";

        const startOptions: IStartRegionParms = {} as any;
        startOptions.memberName = "IMJJPP1";

        try {
            response = await stopRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages["OM1OM   "].rc).toBe("00000000");
        expect(response.messages["OM1OM   "].command).toContain("STOP REGION JOBNAME IMJJPP1");
    });

    // TODO - IBM NEEDS TO EXPLAIN HOW JOBNAME WORKS
    // it("should start region by memberName with jobName specified", async () => {
    //     let error;
    //     let response;
    //
    //     options.memberName = "IMJJPP1";
    //     // options.jobName = "JOBNAME"
    //
    //     try {
    //         response = await startRegion(session, options);
    //     } catch (err) {
    //         error = err;
    //     }
    //
    //     expect(error).toBeFalsy();
    //     expect(response).toBeTruthy();
    //     expect(response.messages["OM1OM   "].rc).toBe("00000000");
    //     expect(response.messages["OM1OM   "].command).toContain("START REGION IMJJPP1");
    // });

    it("should fail to stop region due to neither regNum nor jobName specified", async () => {
        let error;
        let response;

        options.regNum = undefined;
        options.jobName = undefined;

        try {
            response = await stopRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeTruthy();
        expect(response).toBeFalsy();
        expect(error.mDetails.msg).toContain("");
    });
});
