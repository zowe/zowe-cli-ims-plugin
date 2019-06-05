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
const strings = (require("../../-strings-/en").default as typeof i18nTypings).QUERY.RESOURCES.REGION;

export const RegionDefinition: ICommandDefinition = {
    name: "region", aliases: ["reg"],
    description: strings.DESCRIPTION,
    handler: __dirname + "/Region.handler",
    type: "command",
    positionals: [],
    outputFormatOptions: true,
    options: [
        {
            name: "dc",
            description: strings.OPTIONS.DC,
            type: "boolean",
            defaultValue: true
        },
        {
            name: "region",
            description: strings.OPTIONS.REGION,
            type: "boolean",
            defaultValue: true
        },
        {
            name: "route",
            description: strings.OPTIONS.ROUTE,
            type: "array",
            aliases: ["rt"],
        }
    ],
    profile: {optional: ["ims"]},
    examples: [{
        description: strings.EXAMPLES.EX1,
        options: "\"IMS1\""
    },
    {
        description: strings.EXAMPLES.EX2,
        options: "\"IMS1 IMS2\""
    },
    {
        description: strings.EXAMPLES.EX3,
        options: "\"IMS1 IMS2\" --dc true --region true"
    },
    {
        description: strings.EXAMPLES.EX4,
        options: "--host \"localhost\" --port 8080 --ich \"zos1\" --icp 9999 --plex \"PLEX1\""
    }]
};
