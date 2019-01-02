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

import { ImsSession } from "../ImsSession";
import { ICommandDefinition } from "@brightside/imperative";
import { ProgramDefinition } from "./program/Program.definition";
import { RegionDefinition } from "./region/Region.definition";
import { TransactionDefinition } from "./transaction/Transaction.definition";

import i18nTypings from "../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../-strings-/en").default as typeof i18nTypings).STOP;

/**
 * Definition for the "stop" group of commands under the IMS plugin
 */
const definition: ICommandDefinition = {
    name: "stop",
    summary: strings.SUMMARY,
    description: strings.DESCRIPTION,
    type: "group",
    children: [ProgramDefinition,
               RegionDefinition,
               TransactionDefinition],
    passOn: [
        {
            property: "options",
            value: ImsSession.IMS_CONNECTION_OPTIONS,
            merge: true,
            ignoreNodes: [
                {type: "group"}
            ]
        }
    ]
};
export = definition;
