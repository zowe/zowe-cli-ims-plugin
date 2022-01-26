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
import { IStopRegionParms } from "../../doc/IStopRegionParms";
import { ImsConstants } from "../../constants";
import { getQueryFromParms } from "../CommonUtils";
import { ImsSessionUtils } from "../../../cli/ImsSessionUtils";

/**
 * Stop program in IMS through REST API
 * @param {ImsSession} session - the session to connect to IMS with
 * @param {IUpdateProgramParms} parms - parameters for stopping a program
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function stopProgram(session: ImsSession, parms: IUpdateProgramParms): Promise<IIMSApiResponse> {
    ImperativeExpect.toNotBeNullOrUndefined(parms.name, "IMS program name is required");
    ImperativeExpect.toBeDefinedAndNonBlank(parms.name[0], "IMS program name", "IMS program name is required");

    Logger.getAppLogger().debug("Attempting to stop programs(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsSessionUtils.getUrl(session.ISession.basePath) + session.plex + "/" + ImsConstants.PROGRAM;

    resource = resource + getQueryFromParms(parms, {stop: "SCHD"});

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}

/**
 * Stop transaction in IMS through REST API
 * @param {ImsSession} session - the session to connect to IMS with
 * @param {IUpdateTransactionParms} parms - parameters for stopping a transaction
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function stopTransaction(session: ImsSession, parms: IUpdateTransactionParms): Promise<IIMSApiResponse> {
    ImperativeExpect.toNotBeNullOrUndefined(parms.name, "IMS transaction name is required");
    ImperativeExpect.toBeDefinedAndNonBlank(parms.name[0], "IMS Transaction name", "IMS transaction name is required");

    Logger.getAppLogger().debug("Attempting to stop transactions(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsSessionUtils.getUrl(session.ISession.basePath) + session.plex + "/" + ImsConstants.TRANSACTION;

    resource = resource + getQueryFromParms(parms, {stop: "SCHD"});

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}

/**
 * Stop region in IMS through REST API
 * @param {ImsSession} session - the session to connect to IMS with
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

    if (parms.reg_num == null) {
        ImperativeExpect.toBeDefinedAndNonBlank(parms.job_name, "If job name is specified it must have a value.");
    }

    Logger.getAppLogger().debug("Attempting to stop a region with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsSessionUtils.getUrl(session.ISession.basePath) + session.plex + "/" + ImsConstants.REGION + "/" + ImsConstants.STOP;

    resource = resource + getQueryFromParms(parms);

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}
