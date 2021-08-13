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
import { IIMSApiResponse, IStartRegionParms, IUpdateProgramParms, IUpdateTransactionParms } from "../../doc";
import { ImsConstants } from "../../constants";

/**
 * Start program in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IUpdateProgramParms} parms - parameters for start program(s)
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function startProgram(session: ImsSession, parms: IUpdateProgramParms): Promise<IIMSApiResponse> {
    if (parms.name === undefined) {
        throw new ImperativeError({msg: "Expect Error: IMS program name is required"});
    }

    ImperativeExpect.toBeDefinedAndNonBlank(parms.name[0], "IMS program name", "IMS program name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to start program(s) with the following parameters:\n%s", JSON.stringify(parms));

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

    if (parms.start !== undefined) {
        // 'name' text must be lower case
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
export async function startTransaction(session: ImsSession, parms: IUpdateTransactionParms): Promise<IIMSApiResponse> {

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

    if (parms.start !== undefined) {
        // 'start' text must be lower case
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
export async function startRegion(session: ImsSession, parms: IStartRegionParms): Promise<IIMSApiResponse> {

    ImperativeExpect.toBeDefinedAndNonBlank(parms.memberName, "IMS member name", "IMS member name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to start a region with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsConstants.URL + session.plex + "/" + ImsConstants.REGION + "/" + ImsConstants.START;

    if (parms.memberName != null) {
        // 'member_name' text must be lower case
        resource = resource + delimiter + "member_name=" + encodeURIComponent(parms.memberName);
        delimiter = "&";
    }
    if (parms.job_name != null) {
        // 'job_name' text must be lower case
        resource = resource + delimiter + "job_name=" + encodeURIComponent(parms.job_name);
        delimiter = "&";
    }
    if (parms.local != null) {
        // 'local' text must be lower case
        resource = resource + delimiter + "local=" + encodeURIComponent(parms.local + "");
    }
    if (parms.route != null) {
        // 'route' text must be lower case
        resource = resource + delimiter + "route=";
        resource = resource + encodeURIComponent(parms.route.join(","));
    }
    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}
