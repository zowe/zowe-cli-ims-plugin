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

import { AbstractSession, ICommandHandler, IHandlerParameters, IProfile,
    ITaskWithStatus, TaskStage } from "@brightside/imperative";
import { startRegion, IIMSApiResponse } from "../../../api";
import { ImsBaseHandler } from "../../ImsBaseHandler";

import i18nTypings from "../../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../../-strings-/en").default as typeof i18nTypings).START.RESOURCES.REGION;

/**
 * Command handler for starting IMS regions
 * @export
 * @class RegionHandler
 * @implements {ICommandHandler}
 */
export default class RegionHandler extends ImsBaseHandler {
    public async processWithSession(params: IHandlerParameters,
                                    session: AbstractSession,
                                    profile: IProfile): Promise<IIMSApiResponse> {

        const status: ITaskWithStatus = {
            statusMessage: "Start region defined to IMS",
            percentComplete: 0,
            stageName: TaskStage.IN_PROGRESS
        };
        params.response.progress.startBar({task: status});

        const response = await startRegion(session, {
            name: params.arguments.regionName
        });

        params.response.console.log(strings.MESSAGES.SUCCESS, params.arguments.regionName);
        return response;
    }
}
