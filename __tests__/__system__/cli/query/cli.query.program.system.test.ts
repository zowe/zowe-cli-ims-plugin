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

// Test environment will be populated in the "beforeAll"
let TEST_ENVIRONMENT: ITestEnvironment<ITestPropertiesSchema>;
let route: string;
let program: string;

describe("ims query program", () => {

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "query_program_command",
            installPlugin: true,
            tempProfileTypes: ["ims"]
        });
        route = TEST_ENVIRONMENT.systemTestProperties.ims.route;
        program = TEST_ENVIRONMENT.systemTestProperties.ims.programWildCard;
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should be able to successfully query programs", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_program.sh", TEST_ENVIRONMENT,
            [program, "ALL", route]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("dopt");
    });

    it("should be able to successfully get resources using profile options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_program_fully_qualified.sh", TEST_ENVIRONMENT,
            [program,
                "ALL",
                route,
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
        expect(stdout).toContain("dopt");
    });

    it("should fail if a program name is too long", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_transaction.sh", TEST_ENVIRONMENT,
            ["TOOOOOOLONGGGGGGGGGGGG", "ALL"]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(output.status).toEqual(1);
        expect(stderr).toContain("TOO LONG");
    });

});
