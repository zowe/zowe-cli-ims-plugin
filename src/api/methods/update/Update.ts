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

import { ImperativeExpect, Logger } from "@zowe/imperative";
import { ImsRestClient, ImsSession } from "../../rest";
import { IIMSApiResponse, IUpdateProgramParms, IUpdateTransactionParms } from "../../doc";
import { ImsConstants } from "../../constants";
import { getQueryFromParms } from "../CommonUtils";
import { ImsSessionUtils } from "../../../cli/ImsSessionUtils";

/**
 * Update program in IMS through REST API
 * @param {ImsSession} session - the session to connect to IMS with
 * @param {IUpdateProgramParms} parms - parameters for update program(s)
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function updateProgram(session: ImsSession, parms: IUpdateProgramParms): Promise<IIMSApiResponse> {
    ImperativeExpect.toNotBeNullOrUndefined(parms.name, "IMS program name is required");
    ImperativeExpect.toBeDefinedAndNonBlank(parms.name[0], "IMS program name", "IMS program name is required");

    Logger.getAppLogger().debug("Attempting to update program(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsSessionUtils.getUrl(session.ISession.basePath) + session.plex + "/" + ImsConstants.PROGRAM;

    resource = resource + getQueryFromParms(parms);

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}

/**
 * Update transaction in IMS through REST API
 * @param {ImsSession} session - the session to connect to IMS with
 * @param {IUpdateTransactionParms} parms - parameters for starting transaction(s)
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS transaction name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function updateTransaction(session: ImsSession, parms: IUpdateTransactionParms): Promise<IIMSApiResponse> {
    ImperativeExpect.toNotBeNullOrUndefined(parms.name, "IMS transaction name is required");
    ImperativeExpect.toBeDefinedAndNonBlank(parms.name[0], "IMS transaction name", "IMS transaction name is required");

    Logger.getAppLogger().debug("Attempting to start transactions(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsSessionUtils.getUrl(session.ISession.basePath) + session.plex + "/" + ImsConstants.TRANSACTION;

    resource = resource + getQueryFromParms(parms);

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}
