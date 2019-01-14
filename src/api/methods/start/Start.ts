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

import { AbstractSession, ImperativeExpect, Logger } from "@brightside/imperative";
import { ImsRestClient } from "../../rest";
import { IIMSApiResponse, IResourceParms } from "../../doc";
import { IStartRegionParms } from "../../doc/IStartRegionParms";

// TODO update to work with IMS REST API
/**
 * Start program in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IResourceParms} parms - parameters for querying a program
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function startProgram(session: AbstractSession, parms: IResourceParms): Promise<IIMSApiResponse> {
    ImperativeExpect.toBeDefinedAndNonBlank(parms.name, "IMS Program name", "IMS program name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to start a program with the following parameters:\n%s", JSON.stringify(parms));

    const imsPlex = "/";
    let imsProgram = "/";

    if (parms.show != null) {
        imsProgram = imsProgram + delimiter + "SHOW(" + encodeURIComponent(parms.show) + ")";
        delimiter = "&";
    }

    return ImsRestClient.getExpectJSON(session, imsProgram, []);
}

/**
 * Start transaction in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IResourceParms} parms - parameters for querying a program
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function startTransaction(session: AbstractSession, parms: IResourceParms): Promise<IIMSApiResponse> {
    ImperativeExpect.toBeDefinedAndNonBlank(parms.name, "IMS Transaction name", "IMS transaction name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to start a transaction with the following parameters:\n%s", JSON.stringify(parms));

    const imsPlex = "/";
    let imsProgram = "/";

    if (parms.show != null) {
        imsProgram = imsProgram + delimiter + "SHOW(" + encodeURIComponent(parms.show) + ")";
        delimiter = "&";
    }

    return ImsRestClient.getExpectJSON(session, imsProgram, []);
}

/**
 * Start region in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IStartRegionParms} parms - parameters for starting a region, see interface for more details
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function startRegion(session: AbstractSession, parms: IStartRegionParms): Promise<IIMSApiResponse> {
    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to start a region with the following parameters:\n%s", JSON.stringify(parms));

    let imsProgram = "/apis/v1/region/start";

    if (parms.memberName != null) {
        imsProgram = imsProgram + delimiter + "membername=" + encodeURIComponent(parms.memberName);
        delimiter = "&";
    }
    if (parms.jobName != null) {
        imsProgram = imsProgram + delimiter + "jobname=" + encodeURIComponent(parms.jobName);
        delimiter = "&";
    }
    if (parms.local != null) {
        imsProgram = imsProgram + delimiter + "local=" + encodeURIComponent(parms.local + "");
    }

    return ImsRestClient.putExpectJSON(session, imsProgram, [], undefined);
}
