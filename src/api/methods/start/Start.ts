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

import { AbstractSession, ImperativeError, ImperativeExpect, Logger } from "@brightside/imperative";
import { ImsRestClient, ImsSession } from "../../rest";
import { IIMSApiResponse, IStartRegionParms, IUpdateProgramParms, IUpdateTransactionParms } from "../../doc";
import { ImsConstants } from "../../constants";

// TODO update to work with IMS REST API
/**
 * Start program in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IUpdateProgramParms} parms - parameters for start program(s)
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function startProgram(session: AbstractSession, parms: IUpdateProgramParms): Promise<IIMSApiResponse> {
    if (parms.names === undefined) {
        throw new ImperativeError({msg: "Expect Error: IMS program name is required"});
    }

    ImperativeExpect.toBeDefinedAndNonBlank(parms.names[0], "IMS Program name", "IMS program name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to start program(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsConstants.URL + ImsConstants.PROGRAM;

    // names is required
    if (parms.names.length > 0) {
        // 'names' text must be lower case
        resource = resource + delimiter + "names=";
        for (let i = 0; i < parms.names.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.names[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.names[i]);
            }
        }
        delimiter = "&";
    }

    if (parms.start !== undefined) {
        // 'names' text must be lower case
        resource = resource + delimiter + "start=";
        for (let i = 0; i < parms.start.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.start[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.start[i]);
            }
        }
        delimiter = "&";
    } else {
        resource += delimiter + "start=SCHD";
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
        // delimiter = "&";
    }

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}

/**
 * Start transaction in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IUpdateTransactionParms} parms - parameters for starting transaction(s)
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS transaction name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function startTransaction(session: AbstractSession, parms: IUpdateTransactionParms): Promise<IIMSApiResponse> {

    if (parms.names === undefined) {
        throw new ImperativeError({msg: "Expect Error: IMS transaction name is required"});
    }

    ImperativeExpect.toBeDefinedAndNonBlank(parms.names[0], "IMS Transaction name", "IMS transaction name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to start transactions(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsConstants.URL + ImsConstants.TRANSACTION;

    // names is required
    if (parms.names.length > 0) {
        // 'names' text must be lower case
        resource = resource + delimiter + "names=";
        for (let i = 0; i < parms.names.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.names[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.names[i]);
            }
        }
        delimiter = "&";
    }

    if (parms.start !== undefined) {
        // 'names' text must be lower case
        resource = resource + delimiter + "start=";
        for (let i = 0; i < parms.start.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.start[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.start[i]);
            }
        }
        delimiter = "&";
    } else {
        resource += delimiter + "start=SCHD";
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
        // delimiter = "&";
    }

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}

/**
 * Start region in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IStartRegionParms} parms - parameters for starting a region, see interface for more details
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS member name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function startRegion(session: AbstractSession, parms: IStartRegionParms): Promise<IIMSApiResponse> {

    ImperativeExpect.toBeDefinedAndNonBlank(parms.memberName, "IMS Member name", "IMS member name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to start a region with the following parameters:\n%s", JSON.stringify(parms));
    const imsSession = session as ImsSession;
    let resource = ImsConstants.URL + imsSession.plex + "/" + ImsConstants.REGION + "/" + ImsConstants.START;

    if (parms.memberName != null) {
        resource = resource + delimiter + "membername=" + encodeURIComponent(parms.memberName);
        delimiter = "&";
    }
    if (parms.jobName != null) {
        resource = resource + delimiter + "jobname=" + encodeURIComponent(parms.jobName);
        delimiter = "&";
    }
    if (parms.local != null) {
        resource = resource + delimiter + "local=" + encodeURIComponent(parms.local + "");
    }

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}
