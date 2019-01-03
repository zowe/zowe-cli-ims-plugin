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
import { IImperativeConfig } from "@brightside/imperative";
import { PluginConstants } from "./api/constants/PluginConstants";
import { ImsSessionUtils } from "./cli/ImsSessionUtils";

const config: IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    rootCommandDescription: PluginConstants.PLUGIN_DESCRIPTION,
    productDisplayName: PluginConstants.PLUGIN_NAME,
    name: PluginConstants.PLUGIN_GROUP_NAME,
    profiles: [
        {
            type: "ims",
            schema: {
                type: "object",
                title: "IMS Profile",
                description: "An ims profile is used to issue commands in the ims command group that interact with " +
                    "IMS regions. The ims profile contains your host, port, user name, and password " +
                    "for the IBM IMS server of your choice.",
                properties: {
                    host: {
                        type: "string",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_HOST
                    },
                    port: {
                        type: "number",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_PORT
                    },
                    regionHost: {
                        type: "string",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_REGION_HOST
                    },
                    regionPort: {
                        type: "number",
                        optionDefinition: ImsSessionUtils.IMS_OPTION_REGION_PORT
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
                    }
                },
                required: ["host"],
            },
            createProfileExamples: [
                {
                    options: "ims123 --host zos123 --port 1490 --user ibmuser --pass myp4ss --plex PLEX1 --region-host zos124 --region-port 1491",
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
