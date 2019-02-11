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

import { runCliScript } from "../../../__src__/TestUtils";
import { ITestEnvironment } from "../../../__src__/environment/doc/response/ITestEnvironment";
import { TestEnvironment } from "../../../__src__/environment/TestEnvironment";

let testEnvironment: ITestEnvironment;
let regionID: number;
let jobName: string;
describe("Stop region command", () => {

    // Create the unique test environment
    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "stop_region_command",
            tempProfileTypes: ["ims"],
            installPlugin: true
        });
        regionID = testEnvironment.systemTestProperties.ims.dependentRegionID;
        jobName = testEnvironment.systemTestProperties.ims.dependentRegionName;
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
        const output = runCliScript(__dirname + "/__scripts__/stop_multiple_regions.sh", testEnvironment,
            [regionID, regionID + 1]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("STOP COMMAND IN PROGRESS");
    });

    it("Should stop a region by specifying a job name and profile options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/stop_region_fully_qualified.sh", testEnvironment,
            [jobName,
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
