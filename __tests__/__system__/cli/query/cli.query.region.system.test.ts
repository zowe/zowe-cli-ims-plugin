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

// Test environment will be populated in the "beforeAll"
let TEST_ENVIRONMENT: ITestEnvironment;

describe("ims query region", () => {

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "query_region_command",
            installPlugin: true,
            tempProfileTypes: ["ims"]
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should be able to successfully query regions", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_region.sh", TEST_ENVIRONMENT,
            [true, true, TEST_ENVIRONMENT.systemTestProperties.ims.route]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("regid");
    });

    it("should be able to successfully get regions using all parameters", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_region_fully_qualified.sh", TEST_ENVIRONMENT,
            [true, true, TEST_ENVIRONMENT.systemTestProperties.ims.route,
                TEST_ENVIRONMENT.systemTestProperties.ims.host,
                TEST_ENVIRONMENT.systemTestProperties.ims.port,
                TEST_ENVIRONMENT.systemTestProperties.ims.user,
                TEST_ENVIRONMENT.systemTestProperties.ims.password,
                TEST_ENVIRONMENT.systemTestProperties.ims.imsConnectHost,
                TEST_ENVIRONMENT.systemTestProperties.ims.imsConnectPort,
                TEST_ENVIRONMENT.systemTestProperties.ims.plex]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("regid");
    });
});
