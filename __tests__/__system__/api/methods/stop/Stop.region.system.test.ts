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

import { ITestEnvironment } from "../../../../__src__/environment/doc/response/ITestEnvironment";
import { TestEnvironment } from "../../../../__src__/environment/TestEnvironment";
import { ImsSession, IStartRegionParms, IStopRegionParms, stopRegion } from "../../../../../src";

let testEnvironment: ITestEnvironment;
let imsConnectHost: string;
let session: ImsSession;
let regionID: number;
let memberName: string;

describe("IMS stop region", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "ims_stop_region",
            installPlugin: true,
            tempProfileTypes: ["ims"]
        });
        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = await testEnvironment.systemTestProperties.ims;

        regionID = testEnvironment.systemTestProperties.ims.dependentRegionID;
        memberName = testEnvironment.systemTestProperties.ims.dependentRegionName;
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
    it("should stop region by reg_num (region id)", async () => {
        let error;
        let response;

        options.reg_num = [regionID];

        try {
            response = await stopRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages["OM1OM   "].command).toContain("STOP REGION " + regionID);
    });

    // NOTE: region must be started manually at this point
    it("should stop region by job_name", async () => {
        let error;
        let response;

        options.reg_num = undefined;
        options.job_name = memberName;

        try {
            response = await stopRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages["OM1OM   "].command).toContain("STOP REGION JOBNAME ");
    });

    // TODO - IBM NEEDS TO EXPLAIN HOW JOBNAME WORKS
    // it("should start region by memberName with job_name specified", async () => {
    //     let error;
    //     let response;
    //
    //     options.memberName = "IMJJPP1";
    //     // options.job_name = "JOBNAME"
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

    it("should fail to stop region due to neither reg_num nor job_name specified", async () => {
        let error;
        let response;

        options.reg_num = undefined;
        options.job_name = undefined;

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
