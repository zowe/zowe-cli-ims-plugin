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
import { ITestPropertiesSchema } from "../../../../__src__/doc/ITestPropertiesSchema";
import { join } from "path";

let testEnvironment: ITestEnvironment<ITestPropertiesSchema>;
describe("Update transaction command", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "update_transaction_cli_integration",
            installPlugin: true,
            skipProperties: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    it("should display the help", async () => {
        const result = runCliScript(join(__dirname, "__scripts__", "update_transaction_help.sh"), testEnvironment);
        expect(result.stderr.toString()).toEqual("");
        expect(result.status).toEqual(0);
        expect(result.stdout.toString()).toMatchSnapshot();
    });

});
