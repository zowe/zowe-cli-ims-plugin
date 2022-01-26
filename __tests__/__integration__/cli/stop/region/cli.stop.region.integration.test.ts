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

import { TestEnvironment } from "../../../../__src__/environment/TestEnvironment";
import { ITestEnvironment } from "../../../../__src__/environment/doc/response/ITestEnvironment";
import { runCliScript } from "../../../../__src__/TestUtils";
import { join } from "path";

let testEnvironment: ITestEnvironment;
describe("Start region command", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "start_region_cli_integration",
            installPlugin: true,
            skipProperties: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    it("should display the help", async () => {
        const result = runCliScript(join(__dirname, "__scripts__", "stop_region_help.sh"), testEnvironment);
        expect(result.stderr.toString()).toEqual("");
        expect(result.status).toEqual(0);
        expect(result.stdout.toString()).toMatchSnapshot();
    });

    it("should reject mutually exclusive options --job-name and --region-ids", async () => {
        const result = runCliScript(join(__dirname, "__scripts__", "stop_region_conflict.sh"), testEnvironment);
        expect(result.status).toEqual(1);
        expect(result.stderr.toString()).toContain("conflict");
        expect(result.stderr.toString()).toMatchSnapshot();
    });

});
