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

import { AbstractSession, ICommandHandler, IHandlerParameters, ITaskWithStatus, TaskStage, IProfile } from "@brightside/imperative";
import { queryTransaction, IIMSApiResponse } from "../../../api";
import { ImsBaseHandler } from "../../ImsBaseHandler";

import i18nTypings from "../../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../../-strings-/en").default as typeof i18nTypings).QUERY.RESOURCES.TRANSACTION;

/**
 * Command handler for defining IMS programs
 * @export
 * @class ProgramHandler
 * @implements {ICommandHandler}
 */
export default class TransactionHandler extends ImsBaseHandler {
    public async processWithSession(params: IHandlerParameters, session: AbstractSession, profile: IProfile): Promise<IIMSApiResponse> {

        const status: ITaskWithStatus = {
            statusMessage: "Querying resources from IMS",
            percentComplete: 0,
            stageName: TaskStage.IN_PROGRESS
        };
        params.response.progress.startBar({task: status});

        const response = await queryTransaction(session, {
            name: params.arguments.transactionName,
            show: params.arguments.show
        });

        params.response.console.log(strings.MESSAGES.SUCCESS, params.arguments.transactionName);
        return response;
    }
}
