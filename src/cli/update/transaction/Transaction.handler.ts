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

import {
    ICommandHandler,
    IHandlerParameters,
    IProfile,
    ITaskWithStatus, Logger,
    TaskStage,
    TextUtils
} from "@brightside/imperative";
import { IIMSApiResponse, ImsSession, updateTransaction } from "../../../api";
import { ImsBaseHandler } from "../../ImsBaseHandler";

import i18nTypings from "../../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../../-strings-/en").default as typeof i18nTypings).UPDATE.RESOURCES.TRANSACTION;

/**
 * Command handler for stopping IMS transactions
 * @export
 * @class TransactionHandler
 * @implements {ICommandHandler}
 */
export default class TransactionHandler extends ImsBaseHandler {
    public async processWithSession(params: IHandlerParameters,
                                    session: ImsSession,
                                    profile: IProfile): Promise<IIMSApiResponse> {

        const status: ITaskWithStatus = {
            statusMessage: "update transaction defined to IMS",
            percentComplete: 0,
            stageName: TaskStage.IN_PROGRESS
        };
        params.response.progress.startBar({task: status});

        const response = await updateTransaction(session, {
            names: params.arguments.names,
            aocmd: params.arguments.aocmd,
            class: params.arguments.class,
            cmtmode: params.arguments.cmtmode,
            conv: params.arguments.conv,
            cpri: params.arguments.cpri,
            dclwa: params.arguments.dclwa,
            dirroute: params.arguments.dirroute,
            editrtn: params.arguments.editrtn,
            edituc: params.arguments.edituc,
            emhbsz: params.arguments.emhbsz,
            exprtime: params.arguments.exprtime,
            fp: params.arguments.fp,
            inq: params.arguments.inq,
            lct: params.arguments.lct,
            lpri: params.arguments.lpri,
            lock: params.arguments.lock,
            maxrgn: params.arguments.maxrgn,
            msgtype: params.arguments.msgtype,
            msname: params.arguments.msname,
            npri: params.arguments.npri,
            option: params.arguments.option,
            parlim: params.arguments.parlim,
            pgm: params.arguments.pgm,
            plct: params.arguments.plct,
            plcttime: params.arguments.plcttime,
            recover: params.arguments.recover,
            remote: params.arguments.remote,
            resp: params.arguments.resp,
            route: params.arguments.route,
            scope: params.arguments.scope,
            segno: params.arguments.segno,
            segsz: params.arguments.segsz,
            serial: params.arguments.serial,
            setClass: params.arguments.setClass,
            sidl: params.arguments.sidl,
            sidr: params.arguments.sidr,
            spasz: params.arguments.spasz,
            spatrunc: params.arguments.spatrunc,
            transtat: params.arguments.transtat,
            wfi: params.arguments.wfi
        });

        this.checkReturnCode(response);

        params.response.console.log(TextUtils.prettyJson(response.data));

        Logger.getAppLogger().info("Messages from the update transaction API:\n" + JSON.stringify(response.messages, null, 2));
        return response;
    }
}
