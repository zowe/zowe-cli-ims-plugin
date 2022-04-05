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

import { IHandlerParameters, ITaskWithStatus, Logger, TaskStage, TextUtils } from "@zowe/imperative";
import { IIMSApiResponse, ImsSession, stopRegion } from "../../../api";
import { ImsBaseHandler } from "../../ImsBaseHandler";

/**
 * Command handler for stopping IMS regions
 * @export
 * @class RegionHandler
 * @implements {ICommandHandler}
 */
export default class RegionHandler extends ImsBaseHandler {
    public async processWithSession(params: IHandlerParameters,
        session: ImsSession): Promise<IIMSApiResponse> {

        const status: ITaskWithStatus = {
            statusMessage: "Stop region defined to IMS",
            percentComplete: 0,
            stageName: TaskStage.IN_PROGRESS
        };
        params.response.progress.startBar({task: status});

        const response = await stopRegion(session, {
            reg_num: params.arguments.regionIds,
            job_name: params.arguments.jobName,
            abdump: params.arguments.abdump,
            cancel: params.arguments.cancel,
            transaction: params.arguments.transaction,
            route: params.arguments.route
        });

        this.checkReturnCode(response);

        params.response.console.log(TextUtils.prettyJson(response.data));
        Logger.getAppLogger().info("Messages from the stop region API:\n" + JSON.stringify(response.messages, null, 2));
        return response;
    }
}
