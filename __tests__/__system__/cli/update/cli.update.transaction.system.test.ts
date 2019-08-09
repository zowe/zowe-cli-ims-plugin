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
let transactionName: string;
let route: string;
const sixteen = 16;

describe("Update transaction command", () => {

    // Create the unique test environment
    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "update_transaction_command",
            tempProfileTypes: ["ims"],
            installPlugin: true
        });
        transactionName = testEnvironment.systemTestProperties.ims.transaction;
        route = testEnvironment.systemTestProperties.ims.route;
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    it("Should update a transaction by specifying its name and some options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/update_transaction.sh", testEnvironment,
            [transactionName,
                "Y",
                1,
                "N",
                route,
                1,
                "N"]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("- \n  cc:   0");
    });

    it("Should update a transaction by specifying its name and some other options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/update_transaction_error.sh", testEnvironment,
            [transactionName,
                "Y",
                "N",
                "N",
                route,
                1,
                "N"]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("- \n  cc:   0");
    });

    it("Should update a transaction by specifying a name, some options and profile options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/update_transaction_fully_qualified.sh", testEnvironment,
            [transactionName,
                "Y",
                1,
                "N",
                route,
                1,
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
        expect(stdout).toContain("- \n  cc:   0");
    });

    it("Should return an error concerning fastpath", async () => {
        const output = runCliScript(__dirname + "/__scripts__/update_transaction_error.sh", testEnvironment,
            [transactionName,
                "Y",
                "N",
                "E",
                route,
                1,
                "N"]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toContain("No fastpath");
    });

});
