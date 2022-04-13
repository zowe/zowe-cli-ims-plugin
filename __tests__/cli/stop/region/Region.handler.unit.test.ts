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

import { mockHandlerParameters } from "@zowe/cli-test-utils";
import { IHandlerParameters, IProfile, CommandProfiles } from "@zowe/imperative";
import { ImsSession, IIMSApiResponse } from "../../../../src";
import { RegionDefinition } from "../../../../src/cli/stop/region/Region.definition";
import RegionHandler from "../../../../src/cli/stop/region/Region.handler";

jest.mock("../../../../src/api/methods/stop");
const Stop = require("../../../../src/api/methods/stop");

const host = "somewhere.com";
const port = "43443";
const user = "someone";
const password = "somesecret";
const imsConnectHost = "mvssys";
const imsConnectPort = "9999";
const plex = "plex";

const PROFILE_MAP = new Map<string, IProfile[]>();
PROFILE_MAP.set(
    "ims", [{
        name: "ims",
        type: "ims",
        host,
        port,
        user,
        password,
        imsConnectHost,
        imsConnectPort,
        plex
    }]
);
const PROFILES: CommandProfiles = new CommandProfiles(PROFILE_MAP);
const DEFAULT_PARAMETERS: IHandlerParameters = mockHandlerParameters({
    positionals: [],
    definition: RegionDefinition,
    profiles: PROFILES
});

describe("StopRegionHandler", () => {
    const regionIds = 1;
    const regNum = regionIds;
    const jobName = "job_name";
    const abdump = "transaction1";
    const transaction = "transaction";
    const cancel = false;

    const defaultReturn: IIMSApiResponse = {
        data: {},
        messages: {}
    };

    const functionSpy = jest.spyOn(Stop, "stopRegion");

    beforeEach(() => {
        functionSpy.mockClear();
        functionSpy.mockImplementation(async () => defaultReturn);
    });

    it("should call the stop region api", async () => {
        const handler = new RegionHandler();

        const commandParameters = {...DEFAULT_PARAMETERS};
        commandParameters.arguments = {
            ...commandParameters.arguments,
            regionIds,
            jobName,
            abdump,
            transaction,
            cancel,
            host,
            port,
            user,
            password,
            imsConnectHost,
            imsConnectPort,
            plex
        };

        await handler.process(commandParameters);

        expect(functionSpy).toHaveBeenCalledTimes(1);
        const testProfile = PROFILE_MAP.get("ims")[0];
        expect(functionSpy).toHaveBeenCalledWith(
            new ImsSession({
                type: "basic",
                hostname: testProfile.host,
                port: testProfile.port,
                user: testProfile.user,
                password: testProfile.password,
                imsConnectHost: testProfile.imsConnectHost,
                imsConnectPort: testProfile.imsConnectPort,
                plex: testProfile.plex,
                strictSSL: true,
                protocol: "https",
            }),
            {
                reg_num: regNum,
                job_name: jobName,
                abdump,
                transaction,
                cancel
            }
        );
    });
});
