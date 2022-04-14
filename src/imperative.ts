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

// Imperative version of Zowe CLI
import { IImperativeConfig } from "@zowe/imperative";
import { PluginConstants } from "./api/constants/PluginConstants";
import { ImsSessionUtils } from "./cli/ImsSessionUtils";

const config: IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    rootCommandDescription: PluginConstants.PLUGIN_DESCRIPTION,
    productDisplayName: PluginConstants.PLUGIN_NAME,
    name: PluginConstants.PLUGIN_GROUP_NAME,
    // apimlConnLookup: [
    //     {
    //         apiId: "place_the_ims_apiId_here",
    //         gatewayUrl: "api/v1",
    //         connProfType: "ims"
    //     }
    // ],
    profiles: [
        {
            type: "ims",
            schema: {
                type: "object",
                title: "IMS Profile",
                description: "An ims profile is used to issue commands in the ims command group that interact with " +
                    "IMS regions. The ims profile contains your IMS Operations API web server host, port, user name and " +
                    "password, IMS Connect host and port and IMS plex name.",
                properties: {
                    host: {
                        type: "string",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_HOST
                    },
                    port: {
                        type: "number",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_PORT
                    },
                    imsConnectHost: {
                        type: "string",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_IMS_CONNECT_HOST
                    },
                    imsConnectPort: {
                        type: "number",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_IMS_CONNECT_PORT
                    },
                    plex: {
                        type: "string",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_PLEX
                    },
                    user: {
                        type: "string",
                        secure: true,
                        optionDefinition: ImsSessionUtils.IMS_OPTION_USER
                    },
                    password: {
                        type: "string",
                        secure: true,
                        optionDefinition: ImsSessionUtils.IMS_OPTION_PASSWORD
                    },
                    basePath: {
                        type: "string",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_BASE_PATH,
                    },
                    protocol: {
                        type: "string",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_PROTOCOL
                    },
                    rejectUnauthorized: {
                        type: "boolean",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_REJECT_UNAUTHORIZED
                    }
                },
                required: [],
            },
            createProfileExamples: [
                {
                    options: "ims123 --host zos123 --port 1490 --user ibmuser --pass myp4ss --plex PLEX1 --ich zos124 --icp 1491",
                    description: "Create a ims profile named 'ims123' to connect to IMS APIs at host zos123 and port 1490. The name of " +
                        "the IMS plex in this example is 'PLEX1' and the IMS region we want to communicate with has " +
                        "a host of zos124 and a port of 1491"
                }
            ]
        }
    ],
    pluginHealthCheck: __dirname + "/healthCheck"
};

export = config;
