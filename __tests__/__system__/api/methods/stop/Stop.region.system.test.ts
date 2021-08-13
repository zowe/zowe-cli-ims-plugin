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
import {
    ImsSession,
    IStartRegionParms,
    startRegion,
    IStopRegionParms,
    stopRegion,
    IQueryRegionParms, queryRegion
} from "../../../../../src";

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
        const imsProperties = testEnvironment.systemTestProperties.ims;

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

    beforeEach(async () => {

        regionID = await queryRegionActiveStartIfNot(session, memberName);

    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    const options: IStopRegionParms = {} as any;

    it("should stop region by reg_num (region id)", async () => {
        let error;
        let response;

        options.reg_num = [regionID];
        options.job_name = undefined;

        try {
            response = await stopRegion(session, options);
        } catch (err) {
            error = err;
        }

        expect(error).toBeFalsy();
        expect(response).toBeTruthy();
        expect(response.messages[systemMessageID].command).toContain("STOP REGION " + regionID);
    });

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

async function queryRegionActiveStartIfNot(session1: ImsSession, memberName1: string) {
    const MAX_LOOPS = 10;
    let error;
    let response;
    let id = 0;
    const queryOptions: IQueryRegionParms = {} as any;
    queryOptions.dc = true;

    try {
        response = await queryRegion(session1, queryOptions);
    } catch (err) {
        error = err;
    }

    let found = false;

    for (const item of response.data) {
        if (item.jobname === memberName1) {
            found = true;
            id = item.regid;
            break;
        }
    }

    if (found !== true) {
        try {
            const startOptions: IStartRegionParms = {} as any;
            startOptions.memberName = memberName1;
            response = await startRegion(session1, startOptions);
        } catch (err) {
            error = err;
        }

        let started = false;
        let count = 0;

        do {
            try {
                response = await queryRegion(session1, queryOptions);
            } catch (err) {
                error = err;
            }

            for (const item of response.data) {
                if (item.jobname === memberName1) {
                    started = true;
                    id = item.regid;
                    break;
                }
            }
            count++;

        }
        while (started === false && count < MAX_LOOPS);
    }

    return id;
}
