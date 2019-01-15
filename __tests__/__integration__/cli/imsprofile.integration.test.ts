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

import { TestEnvironment } from "../../__src__/environment/TestEnvironment";
import { ITestEnvironment } from "../../__src__/environment/doc/response/ITestEnvironment";
import { runCliScript } from "../../__src__/TestUtils";

let testEnvironment: ITestEnvironment;
describe("Creating an IMS profile", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            installPlugin: true,
            testName: "ims_profile"
        });
    });

    it("should create an IMS profile successfully with fake connection details", () => {
        const output = runCliScript(__dirname + "/__scripts__/create_ims_profile.sh", testEnvironment);
        expect(output.stderr.toString()).toEqual("");
        expect(output.status).toEqual(0);
        expect(output.stdout.toString()).toContain("success");
    });
});
