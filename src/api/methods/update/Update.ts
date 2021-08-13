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

import { ImperativeError, ImperativeExpect, Logger } from "@zowe/imperative";
import { ImsRestClient, ImsSession } from "../../rest";
import { IIMSApiResponse, IUpdateProgramParms, IUpdateTransactionParms } from "../../doc";
import { ImsConstants } from "../../constants";

/**
 * Update program in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IUpdateProgramParms} parms - parameters for update program(s)
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function updateProgram(session: ImsSession, parms: IUpdateProgramParms): Promise<IIMSApiResponse> {
    if (parms.name === undefined) {
        throw new ImperativeError({msg: "Expect Error: IMS program name is required"});
    }

    ImperativeExpect.toBeDefinedAndNonBlank(parms.name[0], "IMS program name", "IMS program name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to update program(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsConstants.URL + session.plex + "/" + ImsConstants.PROGRAM;

    // name is required
    if (parms.name.length > 0) {
        // 'name' text must be lower case
        resource = resource + delimiter + "name=";
        for (let i = 0; i < parms.name.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.name[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.name[i]);
            }
        }
        delimiter = "&";
    }
    if (parms.bmptype !== undefined) {
        // 'bmptype' text must be lower case
        resource = resource + delimiter + "bmptype=" + encodeURIComponent(parms.bmptype + "");
    }
    if (parms.dopt !== undefined) {
        // 'dopt' text must be lower case
        resource = resource + delimiter + "dopt=" + encodeURIComponent(parms.dopt + "");
    }
    if (parms.fp !== undefined) {
        // 'fp' text must be lower case
        resource = resource + delimiter + "fp=" + encodeURIComponent(parms.fp + "");
    }
    if (parms.gpsb !== undefined) {
        // 'gpsb' text must be lower case
        resource = resource + delimiter + "gpsb=" + encodeURIComponent(parms.gpsb + "");
    }
    if (parms.lang !== undefined) {
        // 'lang' text must be lower case
        resource = resource + delimiter + "lang=" + encodeURIComponent(parms.lang + "");
    }
    if (parms.lock !== undefined) {
        // 'lock' text must be lower case
        resource = resource + delimiter + "lock=" + encodeURIComponent(parms.lock + "");
    }
    if (parms.resident !== undefined) {
        // 'resident' text must be lower case
        resource = resource + delimiter + "resident=" + encodeURIComponent(parms.resident + "");
    }
    if (parms.schdtype !== undefined) {
        // 'schdtype' text must be lower case
        resource = resource + delimiter + "schdtype=" + encodeURIComponent(parms.schdtype + "");
    }
    if (parms.transtat !== undefined) {
        // 'transtat' text must be lower case
        resource = resource + delimiter + "transtat=" + encodeURIComponent(parms.transtat + "");
    }
    if (parms.option !== undefined) {
        // 'option' text must be lower case
        resource = resource + delimiter + "option=" + encodeURIComponent(parms.option + "");
    }
    if (parms.route !== undefined) {
        // 'route' text must be lower case
        resource = resource + delimiter + "route=";
        for (let i = 0; i < parms.route.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.route[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.route[i]);
            }
        }
    }

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}

/**
 * Update transaction in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IUpdateTransactionParms} parms - parameters for starting transaction(s)
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS transaction name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function updateTransaction(session: ImsSession, parms: IUpdateTransactionParms): Promise<IIMSApiResponse> {

    if (parms.name === undefined) {
        throw new ImperativeError({msg: "Expect Error: IMS transaction name is required"});
    }

    ImperativeExpect.toBeDefinedAndNonBlank(parms.name[0], "IMS transaction name", "IMS transaction name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to start transactions(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsConstants.URL + session.plex + "/" + ImsConstants.TRANSACTION;

    // name is required
    if (parms.name.length > 0) {
        // 'name' text must be lower case
        resource = resource + delimiter + "name=";
        for (let i = 0; i < parms.name.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.name[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.name[i]);
            }
        }
        delimiter = "&";
    }

    if (parms.class !== undefined) {
        // 'class' text must be lower case
        resource = resource + delimiter + "class=";
        for (let i = 0; i < parms.class.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.class[i].toString());
            } else {
                resource = resource + "," + encodeURIComponent(parms.class[i].toString());
            }
        }
    }

    if (parms.scope !== undefined) {
        // 'scope' text must be lower case
        resource = resource + delimiter + "scope=";
        for (let i = 0; i < parms.scope.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.scope[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.scope[i]);
            }
        }
    }

    if (parms.aocmd !== undefined) {
        // 'aocmd' text must be lower case
        resource = resource + delimiter + "aocmd=" + encodeURIComponent(parms.aocmd + "");
    }
    if (parms.setClass !== undefined) {
        // 'setClass' text must be lower case
        resource = resource + delimiter + "setClass=" + encodeURIComponent(parms.setClass + "");
    }
    if (parms.cmtmode !== undefined) {
        // 'cmtmode' text must be lower case
        resource = resource + delimiter + "cmtmode=" + encodeURIComponent(parms.cmtmode + "");
    }
    if (parms.conv !== undefined) {
        // 'conv' text must be lower case
        resource = resource + delimiter + "conv=" + encodeURIComponent(parms.conv + "");
    }
    if (parms.cpri !== undefined) {
        // 'cpri' text must be lower case
        resource = resource + delimiter + "cpri=" + encodeURIComponent(parms.cpri + "");
    }
    if (parms.dclwa !== undefined) {
        // 'dclwa' text must be lower case
        resource = resource + delimiter + "dclwa=" + encodeURIComponent(parms.dclwa + "");
    }
    if (parms.dirroute !== undefined) {
        // 'dirroute' text must be lower case
        resource = resource + delimiter + "dirroute=" + encodeURIComponent(parms.dirroute + "");
    }
    if (parms.editrtn !== undefined) {
        // 'editrtn' text must be lower case
        resource = resource + delimiter + "editrtn=" + encodeURIComponent(parms.editrtn + "");
    }
    if (parms.edituc !== undefined) {
        // 'edituc' text must be lower case
        resource = resource + delimiter + "edituc=" + encodeURIComponent(parms.edituc + "");
    }
    if (parms.emhbsz !== undefined) {
        // 'emhbsz' text must be lower case
        resource = resource + delimiter + "emhbsz=" + encodeURIComponent(parms.emhbsz + "");
    }
    if (parms.exprtime !== undefined) {
        // 'exprtime' text must be lower case
        resource = resource + delimiter + "exprtime=" + encodeURIComponent(parms.exprtime + "");
    }
    if (parms.fp !== undefined) {
        // 'fp' text must be lower case
        resource = resource + delimiter + "fp=" + encodeURIComponent(parms.fp + "");
    }
    if (parms.inq !== undefined) {
        // 'inq' text must be lower case
        resource = resource + delimiter + "inq=" + encodeURIComponent(parms.inq + "");
    }
    if (parms.lct !== undefined) {
        // 'lct' text must be lower case
        resource = resource + delimiter + "lct=" + encodeURIComponent(parms.lct + "");
    }
    if (parms.lpri !== undefined) {
        // 'lpri' text must be lower case
        resource = resource + delimiter + "lpri=" + encodeURIComponent(parms.lpri + "");
    }
    if (parms.lock !== undefined) {
        // 'lock' text must be lower case
        resource = resource + delimiter + "lock=" + encodeURIComponent(parms.lock + "");
    }
    if (parms.maxrgn !== undefined) {
        // 'maxrgn' text must be lower case
        resource = resource + delimiter + "maxrgn=" + encodeURIComponent(parms.maxrgn + "");
    }
    if (parms.msgtype !== undefined) {
        // 'msgtype' text must be lower case
        resource = resource + delimiter + "msgtype=" + encodeURIComponent(parms.msgtype + "");
    }
    if (parms.msname !== undefined) {
        // 'msname' text must be lower case
        resource = resource + delimiter + "msname=" + encodeURIComponent(parms.msname + "");
    }
    if (parms.npri !== undefined) {
        // 'exprtime' text must be lower case
        resource = resource + delimiter + "npri=" + encodeURIComponent(parms.npri + "");
    }
    if (parms.option !== undefined) {
        // 'option' text must be lower case
        resource = resource + delimiter + "option=" + encodeURIComponent(parms.option + "");
    }
    if (parms.parlim !== undefined) {
        // 'parlim' text must be lower case
        resource = resource + delimiter + "parlim=" + encodeURIComponent(parms.parlim + "");
    }
    if (parms.pgm !== undefined) {
        // 'pgm' text must be lower case
        resource = resource + delimiter + "pgm=" + encodeURIComponent(parms.pgm + "");
    }
    if (parms.plct !== undefined) {
        // 'plct' text must be lower case
        resource = resource + delimiter + "plct=" + encodeURIComponent(parms.plct + "");
    }
    if (parms.plcttime !== undefined) {
        // 'plcttime' text must be lower case
        resource = resource + delimiter + "plcttime=" + encodeURIComponent(parms.plcttime + "");
    }
    if (parms.recover !== undefined) {
        // 'recover' text must be lower case
        resource = resource + delimiter + "recover=" + encodeURIComponent(parms.recover + "");
    }
    if (parms.remote !== undefined) {
        // 'remote' text must be lower case
        resource = resource + delimiter + "remote=" + encodeURIComponent(parms.remote + "");
    }
    if (parms.segno !== undefined) {
        // 'segno' text must be lower case
        resource = resource + delimiter + "segno=" + encodeURIComponent(parms.segno + "");
    }
    if (parms.segsz !== undefined) {
        // 'segsz' text must be lower case
        resource = resource + delimiter + "segsz=" + encodeURIComponent(parms.segsz + "");
    }
    if (parms.serial !== undefined) {
        // 'serial' text must be lower case
        resource = resource + delimiter + "pgm=" + encodeURIComponent(parms.serial + "");
    }
    if (parms.sidl !== undefined) {
        // 'sidl' text must be lower case
        resource = resource + delimiter + "sidl=" + encodeURIComponent(parms.sidl + "");
    }
    if (parms.sidr !== undefined) {
        // 'sidr' text must be lower case
        resource = resource + delimiter + "sidr=" + encodeURIComponent(parms.sidr + "");
    }
    if (parms.spasz !== undefined) {
        // 'spasz' text must be lower case
        resource = resource + delimiter + "spasz=" + encodeURIComponent(parms.spasz + "");
    }
    if (parms.spatrunc !== undefined) {
        // 'spatrunc' text must be lower case
        resource = resource + delimiter + "spatrunc=" + encodeURIComponent(parms.spatrunc + "");
    }
    if (parms.transtat !== undefined) {
        // 'transtat' text must be lower case
        resource = resource + delimiter + "transtat=" + encodeURIComponent(parms.transtat + "");
    }
    if (parms.wfi !== undefined) {
        // 'wfi' text must be lower case
        resource = resource + delimiter + "wfi=" + encodeURIComponent(parms.wfi + "");
    }

    if (parms.route !== undefined) {
        // 'route' text must be lower case
        resource = resource + delimiter + "route=";
        resource = resource + parms.route.map(encodeURIComponent).join(",");
    }

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}

