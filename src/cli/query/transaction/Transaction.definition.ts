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
const strings = (require("../../-strings-/en").default as typeof i18nTypings).QUERY.RESOURCES.TRANSACTION;

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
            aliases: ["att"]
        },
        {
            name: "status",
            description: strings.OPTIONS.STATUS,
            type: "array",
            allowableValues: {
                values: ["AFFIN", "BAL", "CONV", "CPIC", "DYN", "IOPREV", "LCK", "NOTINIT",
                    "QERR", "QSTP", "SUSPEND", "STOQ", "STOSCHD", "TRACE", "USTO"],
                caseSensitive: true
            },
            aliases: ["st"],
        },
        {
            name: "route",
            description: strings.OPTIONS.ROUTE,
            type: "array",
            aliases: ["rt"],
        },
        {
            name: "class",
            description: strings.OPTIONS.CLASS,
            type: "array",
            aliases: ["cl"],
        },
        {
            name: "queue-count-operator",
            description: strings.OPTIONS.QCNTCOMP,
            type: "array",
            aliases: ["qco"],
        },
        {
            name: "queue-count-value",
            description: strings.OPTIONS.QCNTVAL,
            type: "number",
            aliases: ["qcv"],
        },
        {
            name: "conversation-attributes",
            description: strings.OPTIONS.CONV,
            type: "string",
            aliases: ["ca"],
        },
        {
            name: "fast-path-options",
            description: strings.OPTIONS.FP,
            type: "string",
            aliases: ["fpo"],
        },
        {
            name: "remote-option-specified",
            description: strings.OPTIONS.REMOTE,
            type: "string",
            aliases: ["ros"],
        },
        {
            name: "response-mode-option-specified",
            description: strings.OPTIONS.RESP,
            type: "string",
            aliases: ["rmos"],
        }

    ],
    profile: {optional: ["ims"]},
    examples: [
        {
            description: strings.EXAMPLES.EX1,
            options: "\"TRN12\""
        },
        {
            description: strings.EXAMPLES.EX2,
            options: "\"TRAN1 TRAN2\""
        },
        {
            description: strings.EXAMPLES.EX3,
            options: "\"TRAN*\""
        },
        {
            description: strings.EXAMPLES.EX4,
            options: ""
        },
        {
            description: strings.EXAMPLES.EX5,
            options: "--attributes \"AFFIN TIMESTAMP\" --status \"NOTINIT\" --route \"IMS1 IMS2\""
        },
        {
            description: strings.EXAMPLES.EX6,
            options: "--user \"username\" --pass \"pass1234\" --host \"localhost\" --port 8080 --ich \"zos1\" --icp 9999 --plex \"PLEX1\""
        }]
};

