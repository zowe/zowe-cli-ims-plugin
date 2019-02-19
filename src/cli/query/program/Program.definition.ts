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

import { ICommandDefinition } from "@brightside/imperative";

import i18nTypings from "../../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../../-strings-/en").default as typeof i18nTypings).QUERY.RESOURCES.PROGRAM;

export const ProgramDefinition: ICommandDefinition = {
    name: "program", aliases: ["pgm"],
    description: strings.DESCRIPTION,
    handler: __dirname + "/Program.handler",
    type: "command",
    positionals: [{
        name: "names...",
        description: strings.POSITIONALS.NAMES,
        type: "string",
        required: false
    }],
    outputFormatOptions: true,
    options: [
        {
            name: "attributes",
            description: strings.OPTIONS.ATTRIBUTES,
            type: "array",
            allowableValues: {
                values: ["ALL", "BMPTYPE", "DEFN", "DEFNTYPE", "DOPT", "FP", "GLOBAL", "IMSID", "GPSB", "LANG",
                    "LOCAL", "MODEL", "RESIDENT", "SCHDTYPE", "STATUS", "TIMESTAMP", "TRANSTAT", "EXPORTNEEDED",
                    "DB", "RTC", "TRAN", "WORK"],
                caseSensitive: true
            },
            aliases: ["att"],
            defaultValue: ["ALL"]
        },
        {
            name: "status",
            description: strings.OPTIONS.STATUS,
            type: "array",
            allowableValues: {
                values: ["DB-NOTAVL", "IOPREV", "LOCK", "NOTINIT", "STOSCHD", "TRACE"],
                caseSensitive: true
            },
            aliases: ["st"],
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
        options: "PGM123"
    },
    {
        description: strings.EXAMPLES.EX2,
        options: "ABC XYZ"
    },
    {
        description: strings.EXAMPLES.EX3,
        options: "PROG*"
    }]
};
