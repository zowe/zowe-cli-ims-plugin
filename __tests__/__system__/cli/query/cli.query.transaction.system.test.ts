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
let transactionName: string;
describe("ims query transaction", () => {

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "query_transaction_command",
            installPlugin: true,
            tempProfileTypes: ["ims"]
        });
        transactionName = TEST_ENVIRONMENT.systemTestProperties.ims.expectedTransaction;
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should be able to successfully query transactions", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_transaction.sh", TEST_ENVIRONMENT,
            [transactionName.substring(0, 1) + "*", "ALL"]); // wildcard the transaction name
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain(transactionName); // expect the full transaction name to come out
    });

    it("should be able to successfully query transactions using fully qualified options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_transaction_fully_qualified.sh", TEST_ENVIRONMENT,
            [transactionName.substring(0, 1) + "*",
                "ALL",
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
        expect(stdout).toContain(transactionName);
    });

    it("should fail if a transaction name is too long", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_transaction.sh", TEST_ENVIRONMENT,
            ["TOOOOOOLONGGGGGGGGGGGG", "ALL"]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(output.status).toEqual(1);
        expect(stderr).toContain("TOO LONG");
    });

});
