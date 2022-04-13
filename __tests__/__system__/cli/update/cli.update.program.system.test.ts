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
let route: string;

describe("Update program command", () => {

    // Create the unique test environment
    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "update_program_command",
            tempProfileTypes: ["ims"],
            installPlugin: true
        });
        programName = testEnvironment.systemTestProperties.ims.programName;
        route = testEnvironment.systemTestProperties.ims.route;
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    it("Should update a program by specifying its name and some options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/update_program.sh", testEnvironment,
            [programName,
                "Y",
                "N",
                "N",
                route,
                "SERIAL",
                "N"]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("- \n  cc:  0");
    });

    it("Should update a program by specifying its name, some options and profile options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/update_program_fully_qualified.sh", testEnvironment,
            [programName,
                "Y",
                "N",
                "N",
                route,
                "SERIAL",
                "N",
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

    it("Should return an error concerning filters", async () => {
        const output = runCliScript(__dirname + "/__scripts__/update_program_all.sh", testEnvironment,
            [programName,
                "N",
                "N",
                "N",
                "Y",
                "COBOL",
                "OFF",
                "N",
                route,
                "SERIAL",
                "N"]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toContain("No filter, an invalid filter, or insufficient # of filters specified");
    });

});
