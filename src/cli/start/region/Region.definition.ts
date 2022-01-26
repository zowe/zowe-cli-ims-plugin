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

import { ICommandDefinition } from "@zowe/imperative";

import i18nTypings from "../../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../../-strings-/en").default as typeof i18nTypings).START.RESOURCES.REGION;

export const RegionDefinition: ICommandDefinition = {
    name: "region", aliases: ["reg"],
    description: strings.DESCRIPTION,
    handler: __dirname + "/Region.handler",
    type: "command",
    positionals: [{
        name: "memberName",
        description: strings.POSITIONALS.MEMBERNAME,
        type: "string",
    }],
    outputFormatOptions: true,
    options: [
        {
            name: "route",
            description: strings.OPTIONS.ROUTE,
            type: "array",
            aliases: ["rte"]
        },
        {
            name: "local", aliases: ["l"],
            description: strings.OPTIONS.LOCAL,
            type: "boolean"
        },
        {
            name: "job-name", aliases: ["jn"],
            description: strings.OPTIONS.JOBNAME,
            type: "string",
        }],
    profile: {optional: ["ims"]},
    examples: [{
        description: strings.EXAMPLES.EX1,
        options: "\"MEM1\""
    },
    {
        description: strings.EXAMPLES.EX2,
        options: "\"MEM2\" --route \"IMS1\""
    },
    {
        description: strings.EXAMPLES.EX3,
        options: "\"MEM3\" --job-name \"JOB9\""
    },
    {
        description: strings.EXAMPLES.EX4,
        options: "\"MEM4\" --route \"IMS1 IMS2\""
    },
    {
        description: strings.EXAMPLES.EX5,
        options: "\"MEM5\" --user \"username\" --pass \"pass1234\" --host \"localhost\" --port 8080 --ich \"zos1\" --icp 9999 --plex \"PLEX1\""
    }]
};
