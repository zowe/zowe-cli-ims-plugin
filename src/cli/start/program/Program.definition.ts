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
const strings = (require("../../-strings-/en").default as typeof i18nTypings).START.RESOURCES.PROGRAM;

export const ProgramDefinition: ICommandDefinition = {
    name: "program", aliases: ["pgm"],
    description: strings.DESCRIPTION,
    handler: __dirname + "/Program.handler",
    type: "command",
    positionals: [{
        name: "names...",
        description: strings.POSITIONALS.NAMES,
        type: "string",
        required: true
    }],
    outputFormatOptions: true,
    options: [{
        name: "attributes",
        description: strings.OPTIONS.ATTRIBUTES,
        type: "array",
        allowableValues: {
            values: ["SCHD", "TRACE", "REFRESH"],
            caseSensitive: true
    },
        aliases: ["att"],
        defaultValue: ["SCHD"]
    },
    {
        name: "route",
        description: strings.OPTIONS.ROUTE,
        type: "array",
        aliases: ["rte"]
    }],
    profile: {optional: ["ims"]},
    examples: [{
        description: strings.EXAMPLES.EX1,
        options: "PGM123"
    }]
};
