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
const strings = (require("../../-strings-/en").default as typeof i18nTypings).SET.RESOURCES.TRANSACTION;

export const TransactionDefinition: ICommandDefinition = {
    name: "transaction", aliases: ["tran"],
    description: strings.DESCRIPTION,
    handler: __dirname + "/Transaction.handler",
    type: "command",
    positionals: [{
        name: "names...",
        description: strings.POSITIONALS.NAMES,
        type: "string",
        required: false
    }],
    outputFormatOptions: true,
    options: [{
        name: "aocmd",
        description: strings.OPTIONS.AOCMD,
        type: "string",
        allowableValues: {
            values: ["N", "CMD", "TRAN", "Y"],
            caseSensitive: true
        },
        aliases: ["a"],
    },
    {
        name: "class",
        description: strings.OPTIONS.CLASS,
        type: "array",
        aliases: ["c"]
    },
    {
        name: "cmtmode",
        description: strings.OPTIONS.CMTMODE,
        type: "string",
        allowableValues: {
            values: ["SINGLE", "MODE"],
            caseSensitive: true
        },
        aliases: ["cm"],
    },
    {
        name: "conv",
        description: strings.OPTIONS.CONV,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["cv"],
    },
    {
        name: "cpri",
        description: strings.OPTIONS.CPRI,
        type: "number",
        aliases: ["cp"],
    },
    {
        name: "dclwa",
        description: strings.OPTIONS.DCLWA,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["dc"],
    },
    {
        name: "dirroute",
        description: strings.OPTIONS.DCLWA,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["dr"],
    },
    {
        name: "editrtn",
        description: strings.OPTIONS.EDITRTN,
        type: "string",
        aliases: ["er"],
    },
    {
        name: "edituc",
        description: strings.OPTIONS.EDITUC,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["eu"],
    },
    {
        name: "emhbsz",
        description: strings.OPTIONS.EMHBSZ,
        type: "number",
        aliases: ["em"],
    },
    {
        name: "exprtime",
        description: strings.OPTIONS.EXPRTIME,
        type: "number",
        aliases: ["et"],
    },
    {
        name: "fp",
        description: strings.OPTIONS.FP,
        type: "string",
        allowableValues: {
            values: ["E", "N", "P"],
            caseSensitive: true
        }
    },
    {
        name: "inq",
        description: strings.OPTIONS.INQ,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
    },
    {
        name: "lct",
        description: strings.OPTIONS.LCT,
        type: "number",
    },
    {
        name: "lpri",
        description: strings.OPTIONS.LPRI,
        type: "number",
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
        name: "maxrgn",
        description: strings.OPTIONS.MAXRGN,
        type: "number",
        aliases: ["mx"],
    },
    {
        name: "msgtype",
        description: strings.OPTIONS.MSGTYPE,
        type: "string",
        allowableValues: {
            values: ["MULTSEG", "SNGLSEG"],
            caseSensitive: true
        },
        aliases: ["mt"],
    },
    {
        name: "msname",
        description: strings.OPTIONS.MSNAME,
        type: "string",
        aliases: ["mn"],
    },
    {
        name: "npri",
        description: strings.OPTIONS.NPRI,
        type: "number",
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
        name: "parlim",
        description: strings.OPTIONS.PARLIM,
        type: "number",
        aliases: ["pl"],
    },
    {
        name: "pgm",
        description: strings.OPTIONS.PGM,
        type: "string",
    },
    {
        name: "plct",
        description: strings.OPTIONS.PLCT,
        type: "number",
    },
    {
        name: "plcttime",
        description: strings.OPTIONS.PLCTTIME,
        type: "number",
        aliases: ["pt"],
    },
    {
        name: "recover",
        description: strings.OPTIONS.RECOVER,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["r"],
    },
    {
        name: "remote",
        description: strings.OPTIONS.REMOTE,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["re"],
    },
    {
        name: "resp",
        description: strings.OPTIONS.RESP,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
    },
    {
        name: "route",
        description: strings.OPTIONS.ROUTE,
        type: "array",
        aliases: ["rte"]
    },
    {
        name: "segno",
        description: strings.OPTIONS.SEGNO,
        type: "number",
        aliases: ["sn"],
    },
    {
        name: "segsz",
        description: strings.OPTIONS.SEGSZ,
        type: "number",
        aliases: ["sz"],
    },
    {
        name: "serial",
        description: strings.OPTIONS.SERIAL,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["sr"],
    },
    {
        name: "setclass",
        description: strings.OPTIONS.SETCLASS,
        type: "number",
        aliases: ["sc"],
    },
    {
        name: "sidl",
        description: strings.OPTIONS.SIDL,
        type: "number",
    },
    {
        name: "sidr",
        description: strings.OPTIONS.SIDR,
        type: "number",
    },
    {
        name: "spasz",
        description: strings.OPTIONS.SPASZ,
        type: "number",
        aliases: ["sp"],
    },
    {
        name: "spatrunc",
        description: strings.OPTIONS.SPATRUNC,
        type: "string",
        allowableValues: {
            values: ["S", "R"],
            caseSensitive: true
        },
        aliases: ["st"],
    },
    {
        name: "transtat",
        description: strings.OPTIONS.TRANSTAT,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["ts"],
    },
    {
        name: "wfi",
        description: strings.OPTIONS.WFI,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
    }],
    profile: {optional: ["ims"]},
    examples: [{
        description: strings.EXAMPLES.EX1,
        options: "TRN1"
    },
    {
        description: strings.EXAMPLES.EX2,
        options: "TRN"
    },
    {
        description: strings.EXAMPLES.EX3,
        options: "TRN2 --attributes SCHD TRACE"
    },
    {
        description: strings.EXAMPLES.EX4,
        options: "TRN3 --route IMS1 IMS2"
    },
    {
        description: strings.EXAMPLES.EX4,
        options: "TRN4 --host localhost --port 8080 --ich zos1 --icp 9999 --plex PLEX1"
    }]
};
