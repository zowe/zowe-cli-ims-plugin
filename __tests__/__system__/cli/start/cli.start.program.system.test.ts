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

let testEnvironment: ITestEnvironment<ITestPropertiesSchema>;
let programName: string;
describe("Start program command", () => {

    // Create the unique test environment
    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "start_program_command",
            tempProfileTypes: ["ims"],
            installPlugin: true
        });
        programName = testEnvironment.systemTestProperties.ims.programName;
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    it("Should start a program by specifying a name", async () => {
        const output = runCliScript(__dirname + "/__scripts__/start_program.sh", testEnvironment,
            [programName]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("- \n  cc:  0");
    });

    it("Should start a program by specifying a name and profile options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/start_program.sh", testEnvironment,
            [programName,
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
        expect(stdout).toContain("- \n  cc:  0");
    });

});
