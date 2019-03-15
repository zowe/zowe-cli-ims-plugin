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
const strings = (require("../../-strings-/en").default as typeof i18nTypings).UPDATE.RESOURCES.PROGRAM;

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
    options: [{
        name: "bmp-type",
        description: strings.OPTIONS.BMPTYPE,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["bmptype"]
    },
    {
        name: "dynamic",
        description: strings.OPTIONS.DOPT,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["dopt"],
    },
    {
        name: "fast-path",
        description: strings.OPTIONS.FP,
        type: "string",
        allowableValues: {
            values: ["E", "N"],
            caseSensitive: true
        },
        aliases: ["fp"],
    },
    {
        name: "generated-psb",
        description: strings.OPTIONS.GPSB,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["gpsb"],
    },
    {
        name: "language",
        description: strings.OPTIONS.LANG,
        type: "string",
        allowableValues: {
            values: ["ASSEM", "COBOL", "JAVA", "PASCAL", "PLI"],
            caseSensitive: true
        },
        aliases: ["lang"],
    },
    {
        name: "lock",
        description: strings.OPTIONS.LOCK,
        type: "string",
        allowableValues: {
            values: ["ON", "OFF"],
            caseSensitive: true
        },
        aliases: ["l"],
    },
    {
        name: "option",
        description: strings.OPTIONS.OPTION,
        type: "string",
        allowableValues: {
            values: ["ALLRSP"],
            caseSensitive: true
        },
        aliases: ["o"],
    },
    {
        name: "resident",
        description: strings.OPTIONS.RESIDENT,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["r"],
    },
    {
        name: "route",
        description: strings.OPTIONS.ROUTE,
        type: "array",
        aliases: ["rte"]
    },
    {
        name: "schedule-type",
        description: strings.OPTIONS.SCHDTYPE,
        type: "string",
        allowableValues: {
            values: ["PARALLEL", "SERIAL"],
            caseSensitive: true
        },
        aliases: ["schdtype"],
    },
    {
        name: "transaction-level-stat",
        description: strings.OPTIONS.TRANSTAT,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["transtat"],
    }],
    profile: {optional: ["ims"]},
    examples: [{
        description: strings.EXAMPLES.EX1,
        options: "PGM123 --fp E"
    },
    {
        description: strings.EXAMPLES.EX2,
        options: "ACC* --bmptype N"
    },
    {
        description: strings.EXAMPLES.EX3,
        options: "PGM234 --lock ON"
    },
    {
        description: strings.EXAMPLES.EX4,
        options: "PGM890 --fp E --route IMS1 IMS2"
    },
    {
        description: strings.EXAMPLES.EX5,
        options: "XYZ1 --lock ON --host localhost --port 8080 --ich zos1 --icp 9999 --plex PLEX1"
    }]
};
