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
import { IStopRegionParms } from "../../doc/IStopRegionParms";
import { ImsConstants } from "../../constants";

// TODO update to work with IMS REST API
/**
 * Stop program in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IUpdateProgramParms} parms - parameters for stopping a program
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function stopProgram(session: ImsSession, parms: IUpdateProgramParms): Promise<IIMSApiResponse> {

    if (parms.name === undefined) {
        throw new ImperativeError({msg: "Expect Error: IMS program name is required"});
    }

    ImperativeExpect.toBeDefinedAndNonBlank(parms.name[0], "IMS program name", "IMS program name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to stop programs(s) with the following parameters:\n%s", JSON.stringify(parms));

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

    if (parms.stop !== undefined) {
        // 'stop' text must be lower case
        resource = resource + delimiter + "stop=";
        for (let i = 0; i < parms.stop.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.stop[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.stop[i]);
            }
        }
        delimiter = "&";
    } else {
        resource += delimiter + "stop=SCHD";
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
 * Stop transaction in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IUpdateTransactionParms} parms - parameters for stopping a transaction
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function stopTransaction(session: ImsSession, parms: IUpdateTransactionParms): Promise<IIMSApiResponse> {

    if (parms.name === undefined) {
        throw new ImperativeError({msg: "Expect Error: IMS transaction name is required"});
    }

    ImperativeExpect.toBeDefinedAndNonBlank(parms.name[0], "IMS Transaction name", "IMS transaction name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to stop transactions(s) with the following parameters:\n%s", JSON.stringify(parms));

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

    if (parms.stop !== undefined) {
        // 'stop' text must be lower case
        resource = resource + delimiter + "stop=";
        for (let i = 0; i < parms.stop.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.stop[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.stop[i]);
            }
        }
        delimiter = "&";
    } else {
        resource += delimiter + "stop=SCHD";
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
 * Stop region in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IStopRegionParms} parms - parameters for stopping the region
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function stopRegion(session: ImsSession, parms: IStopRegionParms): Promise<IIMSApiResponse> {
    ImperativeExpect.toBeEqual(parms.reg_num == null && parms.job_name == null, false,
        "Either region number or job name (but not both) must be specified.");

    ImperativeExpect.toBeEqual(parms.reg_num != null && parms.job_name != null, false,
        "Either region number or job name (but not both) must be specified.");

    if (parms.reg_num === undefined) {
        ImperativeExpect.toBeDefinedAndNonBlank(parms.job_name, "If job name is specified it must have a value.");
    }

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to stop a region with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsConstants.URL + session.plex + "/" + ImsConstants.REGION + "/" + ImsConstants.STOP;

    if (parms.reg_num != null) {
        // 'reg_num' text must be lower case
        resource = resource + delimiter + "reg_num=" + encodeURIComponent(parms.reg_num.join(","));
        delimiter = "&";
    }
    if (parms.job_name != null) {
        // 'job_name' text must be lower case
        resource = resource + delimiter + "job_name=" + encodeURIComponent(parms.job_name);
        delimiter = "&";
    }
    if (parms.abdump != null) {
        // 'abdump' text must be lower case
        resource = resource + delimiter + "abdump=" + encodeURIComponent(parms.abdump);
        delimiter = "&";
    }
    if (parms.transaction != null) {
        // 'transaction' text must be lower case
        resource = resource + delimiter + "transaction=" + encodeURIComponent(parms.transaction);
        delimiter = "&";
    }
    if (parms.cancel != null) {
        // 'cancel' text must be lower case
        resource = resource + delimiter + "cancel=" + encodeURIComponent(parms.cancel + "");
    }
    if (parms.route != null) {
        // 'route' text must be lower case
        resource = resource + delimiter + "route=";
        resource = resource + encodeURIComponent(parms.route.join(","));
    }
    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}
