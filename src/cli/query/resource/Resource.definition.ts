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
const strings = (require("../../-strings-/en").default as typeof i18nTypings).QUERY.RESOURCES.RESOURCE;

export const ResourceDefinition: ICommandDefinition = {
    name: "resource", aliases: ["res"],
    description: strings.DESCRIPTION,
    handler: __dirname + "/Resource.handler",
    type: "command",
    positionals: [{
        name: "resourceName",
        description: strings.POSITIONALS.RESOURCENAME,
        type: "string",
        required: true
    }],
    outputFormatOptions: true,
    options: [
        {
            name: "criteria", aliases: ["c"],
            description: strings.OPTIONS.CRITERIA,
            type: "string"
        },
        {
            name: "parameter", aliases: ["p"],
            description: strings.OPTIONS.PARAMETER,
            type: "string"
        }],

    profile: {optional: ["ims"]},
    examples: [
        {
            description: strings.EXAMPLES.EX1,
            options: "IMSProgram"
        }
    ]
};

