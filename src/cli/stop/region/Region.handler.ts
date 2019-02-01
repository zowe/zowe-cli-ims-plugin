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
import { IIMSApiResponse, stopRegion } from "../../../api";
import { ImsBaseHandler } from "../../ImsBaseHandler";

import i18nTypings from "../../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../../-strings-/en").default as typeof i18nTypings).STOP.RESOURCES.REGION;

/**
 * Command handler for stopping IMS regions
 * @export
 * @class RegionHandler
 * @implements {ICommandHandler}
 */
export default class RegionHandler extends ImsBaseHandler {
    public async processWithSession(params: IHandlerParameters,
                                    session: AbstractSession,
                                    profile: IProfile): Promise<IIMSApiResponse> {

        const status: ITaskWithStatus = {
            statusMessage: "Stop region defined to IMS",
            percentComplete: 0,
            stageName: TaskStage.IN_PROGRESS
        };
        params.response.progress.startBar({task: status});

        const response = await stopRegion(session, {
            regNum: params.arguments.regionIds,
            jobName: params.arguments.jobName,
            abdump: params.arguments.abdump,
            cancel: params.arguments.cancel,
            transaction: params.arguments.transaction
        });

        params.response.console.log(strings.MESSAGES.SUCCESS,
            (params.arguments.regionIds !== undefined) ?
                "--region_ids " + params.arguments.regionIds : "--job-name " + params.arguments.jobName);

        return response;
    }
}
