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

import { IHandlerParameters, IProfile, CommandProfiles, Session } from "@zowe/imperative";
import { ImsSession, IIMSApiResponse } from "../../../../src";
import { ProgramDefinition } from "../../../../src/cli/query/program/Program.definition";
import ProgramHandler from "../../../../src/cli/query/program/Program.handler";

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
const DEFAULT_PARAMETERS: IHandlerParameters = {
    arguments: {$0: "", _: []}, // Please provide arguments later on
    response: {
        data: {
            setMessage: jest.fn((setMsgArgs) => {
                expect(setMsgArgs).toMatchSnapshot();
            }),
            setObj: jest.fn((setObjArgs) => {
                expect(setObjArgs).toMatchSnapshot();
            }),
            setExitCode: jest.fn()
        },
        console: {
            log: jest.fn((logs) => {
                expect(logs.toString()).toMatchSnapshot();
            }),
            error: jest.fn((errors) => {
                expect(errors.toString()).toMatchSnapshot();
            }),
            errorHeader: jest.fn(() => undefined)
        },
        progress: {
            startBar: jest.fn((parms) => undefined),
            endBar: jest.fn(() => undefined)
        },
        format: {
            output: jest.fn((parms) => {
                expect(parms).toMatchSnapshot();
            })
        }
    },
    definition: ProgramDefinition,
    fullDefinition: ProgramDefinition,
    profiles: PROFILES
};

describe("QueryProgramHandler", () => {
    const name = "testProgram";
    const attributes = "ALL";

    const defaultReturn: IIMSApiResponse = {
        data: {},
        messages: {}
      };

    const functionSpy = jest.spyOn(Query, "queryProgram");

    beforeEach(() => {
        functionSpy.mockClear();
        // defaultReturn.response.records[programName.toLowerCase()] = [{prop:"test1"}, {prop:"test2"}];
        functionSpy.mockImplementation(async () => defaultReturn);
    });

    it("should call the query program api", async () => {
        const handler = new ProgramHandler();

        const commandParameters = {...DEFAULT_PARAMETERS};
        commandParameters.arguments = {
            ...commandParameters.arguments,
            name,
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
                strictSSL: false,
                protocol: "http",
            }),
            {
                attribute: undefined,
                name
            }
        );
    });
});
