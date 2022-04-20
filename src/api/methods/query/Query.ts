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

import { Logger } from "@zowe/imperative";
import { ImsRestClient, ImsSession } from "../../rest";
import { IIMSApiResponse, IQueryProgramParms, IQueryRegionParms, IQueryTransactionParms } from "../../doc";
import { ImsConstants } from "../../constants";
import { ImsSessionUtils } from "../../../cli/ImsSessionUtils";
import { getQueryFromParms } from "../CommonUtils";

/**
 * Query program in IMS through REST API
 * @param {ImsSession} session - the session to connect to IMS with
 * @param {IQueryProgramParms} parms - parameters for querying a program
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function queryProgram(session: ImsSession, parms?: IQueryProgramParms): Promise<IIMSApiResponse> {

    Logger.getAppLogger().debug("Attempting to query program(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsSessionUtils.getUrl(session.ISession.basePath) + session.plex + "/" + ImsConstants.PROGRAM;

    resource = resource + getQueryFromParms(parms, {attributes: "ALL"});

    return ImsRestClient.getExpectJSON(session, resource);
}

/**
 * Query transaction in IMS through REST API
 * @param {ImsSession} session - the session to connect to IMS with
 * @param {IQueryTransactionParms} parms - parameters for querying a transaction
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function queryTransaction(session: ImsSession, parms?: IQueryTransactionParms): Promise<IIMSApiResponse> {

    Logger.getAppLogger().debug("Attempting to query transaction(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsSessionUtils.getUrl(session.ISession.basePath) + session.plex + "/" + ImsConstants.TRANSACTION;

    resource = resource + getQueryFromParms(parms);

    return ImsRestClient.getExpectJSON(session, resource);
}

/**
 * Query region in IMS through REST API
 * @param {ImsSession} session - the session to connect to IMS with
 * @param {IQueryTransactionParms} parms - parameters for querying a region
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function queryRegion(session: ImsSession, parms?: IQueryRegionParms): Promise<IIMSApiResponse> {

    Logger.getAppLogger().debug("Attempting to query region(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsSessionUtils.getUrl(session.ISession.basePath) + session.plex + "/" + ImsConstants.REGION;

    resource = resource + getQueryFromParms(parms, {dc: "true", region: "true"});

    return ImsRestClient.getExpectJSON(session, resource);
}
