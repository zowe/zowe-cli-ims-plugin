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

import { ICommandHandler, IHandlerParameters, IProfile, ITaskWithStatus, TaskStage } from "@zowe/imperative";
import { IIMSApiResponse, ImsSession, queryProgram } from "../../../api";
import { ImsBaseHandler } from "../../ImsBaseHandler";

import i18nTypings from "../../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../../-strings-/en").default as typeof i18nTypings).QUERY.RESOURCES.PROGRAM;

/**
 * Command handler for querying IMS programs
 * @export
 * @class ProgramHandler
 * @implements {ICommandHandler}
 */
export default class ProgramHandler extends ImsBaseHandler {
    public async processWithSession(params: IHandlerParameters,
                                    session: ImsSession,
                                    profile: IProfile): Promise<IIMSApiResponse> {

        const status: ITaskWithStatus = {
            statusMessage: "Querying program defined to IMS",
            percentComplete: 0,
            stageName: TaskStage.IN_PROGRESS
        };
        params.response.progress.startBar({task: status});

        const response = await queryProgram(session, {
            name: params.arguments.name,
            attributes: params.arguments.attributes,
            status: params.arguments.status,
            route: params.arguments.route
        });

        this.checkReturnCode(response);

        params.response.format.output({
            header: true,
            output: response.data,
            format: "table",
            fields: params.arguments.attributes? undefined:
                ["pgm", "dopt", "bmpt", "dfnt", "gpsb", "fp", "rgnt", "schd", "mbr", "tmac", "lstt", "lang"]
        });

        return response;
    }
}
