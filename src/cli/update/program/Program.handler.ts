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

import { IHandlerParameters, IProfile, ITaskWithStatus, Logger, TaskStage, TextUtils } from "@zowe/imperative";
import { IIMSApiResponse, ImsSession, updateProgram } from "../../../api";
import { ImsBaseHandler } from "../../ImsBaseHandler";

/**
 * Command handler for updating IMS programs
 * @export
 * @class ProgramHandler
 * @implements {ICommandHandler}
 */
export default class ProgramHandler extends ImsBaseHandler {
    public async processWithSession(params: IHandlerParameters,
        session: ImsSession,
        profile: IProfile): Promise<IIMSApiResponse> {

        const status: ITaskWithStatus = {
            statusMessage: "Update program defined to IMS",
            percentComplete: 0,
            stageName: TaskStage.IN_PROGRESS
        };
        params.response.progress.startBar({task: status});

        const response = await updateProgram(session, {
            name: params.arguments.name,
            bmptype: params.arguments.bmptype,
            dopt: params.arguments.dopt,
            fp: params.arguments.fp,
            gpsb: params.arguments.gpsb,
            lang: params.arguments.lang,
            lock: params.arguments.lock,
            option: params.arguments.option,
            resident: params.arguments.resident,
            route: params.arguments.route,
            schdtype: params.arguments.schdtype,
            transtat: params.arguments.transtat
        });

        this.checkReturnCode(response);

        params.response.console.log(TextUtils.prettyJson(response.data));

        Logger.getAppLogger().info("Messages from the update program API:\n" + JSON.stringify(response.messages, null, 2));
        return response;

    }
}
