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
const strings = (require("../../-strings-/en").default as typeof i18nTypings).UPDATE.RESOURCES.TRANSACTION;

export const TransactionDefinition: ICommandDefinition = {
    name: "transaction", aliases: ["tran"],
    description: strings.DESCRIPTION,
    handler: __dirname + "/Transaction.handler",
    type: "command",
    positionals: [{
        name: "name...",
        description: strings.POSITIONALS.NAME,
        type: "string",
        required: false
    }],
    outputFormatOptions: true,
    options: [{
        name: "aoi-cmd",
        description: strings.OPTIONS.AOCMD,
        type: "string",
        allowableValues: {
            values: ["N", "CMD", "TRAN", "Y"],
            caseSensitive: true
        },
        aliases: ["aocmd"],
    },
    {
        name: "class",
        description: strings.OPTIONS.CLASS,
        type: "array",
        aliases: ["c"]
    },
    {
        name: "commit-mode",
        description: strings.OPTIONS.CMTMODE,
        type: "string",
        allowableValues: {
            values: ["SINGLE", "MODE"],
            caseSensitive: true
        },
        aliases: ["cmtmode"],
    },
    {
        name: "conversation",
        description: strings.OPTIONS.CONV,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["conv"],
    },
    {
        name: "current-priority",
        description: strings.OPTIONS.CPRI,
        type: "number",
        aliases: ["cpri"],
    },
    {
        name: "directed-routing",
        description: strings.OPTIONS.DIRROUTE,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["dirroute"],
    },
    {
        name: "edit-routine",
        description: strings.OPTIONS.EDITRTN,
        type: "string",
        aliases: ["editrtn"],
    },
    {
        name: "edit-uppercase",
        description: strings.OPTIONS.EDITUC,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["edituc"],
    },
    {
        name: "emh-buffer-size",
        description: strings.OPTIONS.EMHBSZ,
        type: "number",
        aliases: ["emhbsz"],
    },
    {
        name: "expiration-time",
        description: strings.OPTIONS.EXPRTIME,
        type: "number",
        aliases: ["exprtime"],
    },
    {
        name: "fast-path",
        description: strings.OPTIONS.FP,
        type: "string",
        allowableValues: {
            values: ["E", "N", "P"],
            caseSensitive: true
        },
        aliases: ["fp"],
    },
    {
        name: "inquiry",
        description: strings.OPTIONS.INQ,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["inq"],
    },
    {
        name: "limit-count",
        description: strings.OPTIONS.LCT,
        type: "number",
        aliases: ["lct"],
    },
    {
        name: "limit-priority",
        description: strings.OPTIONS.LPRI,
        type: "number",
        aliases: ["lpri"],
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
        name: "log-write-ahead",
        description: strings.OPTIONS.DCLWA,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["dclwa"],
    },
    {
        name: "maximum-regions",
        description: strings.OPTIONS.MAXRGN,
        type: "number",
        aliases: ["maxrgn"],
    },
    {
        name: "message-type",
        description: strings.OPTIONS.MSGTYPE,
        type: "string",
        allowableValues: {
            values: ["MULTSEG", "SNGLSEG"],
            caseSensitive: true
        },
        aliases: ["msgtype"],
    },
    {
        name: "msname",
        description: strings.OPTIONS.MSNAME,
        type: "string",
        aliases: ["mn"],
    },
    {
        name: "normal-scheduling-priority",
        description: strings.OPTIONS.NPRI,
        type: "number",
        aliases: ["npri"],
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
        name: "parallel-processing-limit",
        description: strings.OPTIONS.PARLIM,
        type: "number",
        aliases: ["parlim"],
    },
    {
        name: "program",
        description: strings.OPTIONS.PGM,
        type: "string",
        aliases: ["pgm"],
    },
    {
        name: "processing-limit-count",
        description: strings.OPTIONS.PLCT,
        type: "number",
        aliases: ["plct"],
    },
    {
        name: "processing-limit-count-time",
        description: strings.OPTIONS.PLCTTIME,
        type: "number",
        aliases: ["plcttime"],
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
        name: "response-mode",
        description: strings.OPTIONS.RESP,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["resp"],
    },
    {
        name: "route",
        description: strings.OPTIONS.ROUTE,
        type: "array",
        aliases: ["rte"]
    },
    {
        name: "segment-number",
        description: strings.OPTIONS.SEGNO,
        type: "number",
        aliases: ["segno"],
    },
    {
        name: "segment-size",
        description: strings.OPTIONS.SEGSZ,
        type: "number",
        aliases: ["segsz"],
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
        name: "set-class",
        description: strings.OPTIONS.SETCLASS,
        type: "number",
        aliases: ["sc"],
    },
    {
        name: "system-identification-local",
        description: strings.OPTIONS.SIDL,
        type: "number",
        aliases: ["sidl"],
    },
    {
        name: "system-identification-remote",
        description: strings.OPTIONS.SIDR,
        type: "number",
        aliases: ["sidr"],
    },
    {
        name: "scratchpad-area-size",
        description: strings.OPTIONS.SPASZ,
        type: "number",
        aliases: ["spasz"],
    },
    {
        name: "scratchpad-area-truncation",
        description: strings.OPTIONS.SPATRUNC,
        type: "string",
        allowableValues: {
            values: ["S", "R"],
            caseSensitive: true
        },
        aliases: ["spatrunc"],
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
    },
    {
        name: "wait-for-input",
        description: strings.OPTIONS.WFI,
        type: "string",
        allowableValues: {
            values: ["N", "Y"],
            caseSensitive: true
        },
        aliases: ["wfi"],
    }],
    profile: {optional: ["ims"]},
    examples: [{
        description: strings.EXAMPLES.EX1,
        options: "TRN1 --fp E"
    },
    {
        description: strings.EXAMPLES.EX2,
        options: "TRN* --class CLASSA --lock OFF"
    },
    {
        description: strings.EXAMPLES.EX3,
        options: "TRN2 --class CLASS1 CLASS2 --resp Y"
    },
    {
        description: strings.EXAMPLES.EX4,
        options: "TRN3 -fp E --route IMS1 IMS2"
    },
    {
        description: strings.EXAMPLES.EX5,
        options: "TRN4 --pgm PGM1 --host localhost --port 8080 --ich zos1 --icp 9999 --plex PLEX1"
    }]
};
