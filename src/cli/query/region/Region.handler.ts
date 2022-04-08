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

import { IHandlerParameters, ITaskWithStatus, TaskStage } from "@zowe/imperative";
import { IIMSApiResponse, ImsSession, queryRegion } from "../../../api";
import { ImsBaseHandler } from "../../ImsBaseHandler";

/**
 * Command handler for querying IMS regions
 * @export
 * @class RegionHandler
 * @implements {ICommandHandler}
 */
export default class RegionHandler extends ImsBaseHandler {
    public async processWithSession(params: IHandlerParameters,
        session: ImsSession): Promise<IIMSApiResponse> {

        const status: ITaskWithStatus = {
            statusMessage: "Querying region defined to IMS",
            percentComplete: 0,
            stageName: TaskStage.IN_PROGRESS
        };
        params.response.progress.startBar({task: status});

        const response = await queryRegion(session, {
            dc: params.arguments.dc,
            region: params.arguments.region,
            route: params.arguments.route
        });

        this.checkReturnCode(response);

        params.response.format.output({
            header: true,
            output: response.data,
            format: "table"
        });

        return response;
    }
}
