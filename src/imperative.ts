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
        description: "A ims profile is required to issue commands in the ims command group that interact with " +
          "IMS regions. The ims profile contains your host, port, user name, and password " +
          "for the IBM IMS server of your choice.",
        properties: {
          host: {
            type: "string",
            optionDefinition: {
              name: "host",
              aliases: ["H"],
              description: "The IMS server host name",
              type: "string",
              required: true,
            },
          },
          port: {
            type: "number",
            optionDefinition: {
              name: "port",
              aliases: ["P"],
              description: "The IMS server port",
              type: "number",
              defaultValue: 1490,
            },
          },
          user: {
            type: "string",
            secure: true,
            optionDefinition: {
              name: "user",
              aliases: ["u"],
              description: "Your username to connect to IMS",
              type: "string",
              implies: ["password"],
              required: true,
            },
          },
          password: {
            type: "string",
            secure: true,
            optionDefinition: {
              name: "password",
              aliases: ["p"],
              description: "Your password to connect to IMS",
              type: "string",
              implies: ["user"],
              required: true,
            },
          }
        },
        required: ["host"],
      },
      createProfileExamples: [
        {
          options: "ims123 --host zos123 --port 1490 --user ibmuser --password myp4ss",
          description: "Create a ims profile named 'ims123' to connect to IMS at host zos123 and port 1490"
        }
      ]
    }
  ],
  pluginHealthCheck: __dirname + "/healthCheck"
};

export = config;
