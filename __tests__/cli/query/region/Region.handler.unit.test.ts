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
import { RegionDefinition } from "../../../../src/cli/query/region/Region.definition";
import RegionHandler from "../../../../src/cli/query/region/Region.handler";

jest.mock("../../../../src/api/methods/query");
const Query = require("../../../../src/api/methods/query");

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

describe("QueryRegionHandler", () => {
    const dc = true;
    const region = true;
    const route = "fake";

    const defaultReturn: IIMSApiResponse = {
        data: {},
        messages: {}
    };

    const functionSpy = jest.spyOn(Query, "queryRegion");

    beforeEach(() => {
        functionSpy.mockClear();
        // defaultReturn.response.records[regionName.toLowerCase()] = [{prop:"test1"}, {prop:"test2"}];
        functionSpy.mockImplementation(async () => defaultReturn);
    });

    it("should call the query region api", async () => {
        const handler = new RegionHandler();

        const commandParameters = {...DEFAULT_PARAMETERS};
        commandParameters.arguments = {
            ...commandParameters.arguments,
            dc,
            region,
            route,
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
                route,
                region,
                dc
            }
        );
    });
});
