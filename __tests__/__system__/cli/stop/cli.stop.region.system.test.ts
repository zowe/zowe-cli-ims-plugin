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

import { ITestEnvironment, TestEnvironment, runCliScript } from "@zowe/cli-test-utils";
import { ITestPropertiesSchema } from "../../../__src__/doc/ITestPropertiesSchema";
import { ImsSession } from "../../../../src/api/rest";
import { IQueryRegionParms, IStartRegionParms } from "../../../../src/api/doc";
import { queryRegion } from "../../../../src/api/methods/query";
import { startRegion } from "../../../../src/api/methods/start";

let testEnvironment: ITestEnvironment<ITestPropertiesSchema>;
let imsConnectHost: string;
let session: ImsSession;
let regionID: number;
let regionID2: number;
let memberName: string;
let memberName2: string;

describe("Stop region command", () => {

    // Create the unique test environment
    beforeAll(async () => {

        testEnvironment = await TestEnvironment.setUp({
            testName: "stop_region_command",
            tempProfileTypes: ["ims"],
            installPlugin: true
        });

        imsConnectHost = testEnvironment.systemTestProperties.ims.imsConnectHost;
        const imsProperties = testEnvironment.systemTestProperties.ims;
        memberName = testEnvironment.systemTestProperties.ims.dependentRegionName;
        memberName2 = testEnvironment.systemTestProperties.ims.dependentRegionName2;

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
        // retrieve region ID used in all tests
        regionID = await queryRegionActiveStartIfNot(session, memberName);
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    it("Should stop a region by specifying a region ID", async () => {

        const output = runCliScript(__dirname + "/__scripts__/stop_region.sh", testEnvironment,
            [regionID]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("STOP COMMAND IN PROGRESS");
    });

    it("Should stop a multiple regions by specifying multiple region IDs", async () => {

        // need second region ID
        regionID2 = await queryRegionActiveStartIfNot(session, memberName2);

        // region ID is random, so sort in ascending order for command
        const arr = [regionID, regionID2];
        arr.sort();

        const output = runCliScript(__dirname + "/__scripts__/stop_multiple_regions.sh", testEnvironment,
            [ arr[0], arr[1]]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("STOP COMMAND IN PROGRESS");
    });

    it("Should stop a region by specifying a job name and profile options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/stop_region_fully_qualified.sh", testEnvironment,
            [memberName,
                testEnvironment.systemTestProperties.ims.host,
                testEnvironment.systemTestProperties.ims.port,
                testEnvironment.systemTestProperties.ims.user,
                testEnvironment.systemTestProperties.ims.password,
                testEnvironment.systemTestProperties.ims.imsConnectHost,
                testEnvironment.systemTestProperties.ims.imsConnectPort,
                testEnvironment.systemTestProperties.ims.plex]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("STOP COMMAND IN PROGRESS");
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
