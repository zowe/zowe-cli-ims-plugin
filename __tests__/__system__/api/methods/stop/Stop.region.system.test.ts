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
import { ImsSession, IStartRegionParms, startRegion, IStopRegionParms, stopRegion } from "../../../../../src";

let testEnvironment: ITestEnvironment;
let imsConnectHost: string;
let session: ImsSession;
let regionID: number;
let memberName: string;
let systemMessageID: string;

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
        systemMessageID = imsProperties.systemMessageID;

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

    // beforeEach(async () => {
    //     let response;
    //     let error;
    //
    //     const options: IStartRegionParms = {} as any;
    //
    //     options.memberName = "IMJJPP4";
    //
    //     try {
    //         response = await startRegion(session, options);
    //     } catch (err) {
    //         error = err;
    //     }
    //
    // });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    const options: IStopRegionParms = {} as any;

    // NOTE: REGION MUST BE STARTED MANUALLY AND RUNNING BEFORE RUNNING TEST
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
        expect(response.messages[systemMessageID].command).toContain("STOP REGION " + regionID);
    });

    // NOTE: REGION MUST BE STARTED MANUALLY AND RUNNING BEFORE RUNNING TEST
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
        expect(response.messages[systemMessageID].command).toContain("STOP REGION JOBNAME " + memberName);

        for (const messageKey of Object.keys(response.data[0])) {
            expect(response.data[0][messageKey]).toContain("STOP COMMAND IN PROGRESS");
        }
    });

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
        expect(error.mDetails.msg).toContain("Either region number or job name (but not both) must be specified");
    });
});
