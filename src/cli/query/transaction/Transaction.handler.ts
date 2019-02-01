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

import { AbstractSession, ICommandHandler, IHandlerParameters, IProfile, ITaskWithStatus, TaskStage } from "@brightside/imperative";
import { IIMSApiResponse, queryTransaction } from "../../../api";
import { ImsBaseHandler } from "../../ImsBaseHandler";

import i18nTypings from "../../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../../-strings-/en").default as typeof i18nTypings).QUERY.RESOURCES.TRANSACTION;

/**
 * Command handler for defining IMS programs
 * @export
 * @class TransactionHandler
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
            names: params.arguments.names,
            attributes: params.arguments.attributes,
            status: params.arguments.status,
            route: params.arguments.route,
            class: params.arguments.class,
            qcntcomp: params.arguments.queueCountOperator,
            qcntval: params.arguments.queueCountValue,
            conv: params.arguments.converationAttributes,
            fp: params.arguments.fastPathOptions,
            remote: params.arguments.remoteOptionSpecified,
            resp: params.arguments.responseModeOptionSpecified
        });

        params.response.format.output({
            output: response.data,
            format: "table",
            fields: ["tran", "tmcr", "msgt", "mbr", "fp"],
            header: true
        });
        return response;
    }
}
