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
import { IIMSApiResponse, IQueryProgramParms, IQueryTransactionParms } from "../../doc";
import { ImsConstants } from "../../constants";

/**
 * Query program in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IResourceParms} parms - parameters for querying a program
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function queryProgram(session: AbstractSession, parms: IQueryProgramParms): Promise<IIMSApiResponse> {
    // ImperativeExpect.toBeDefinedAndNonBlank(parms.names, "IMS Program name", "IMS program name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to query resource(s) with the following parameters:\n%s", JSON.stringify(parms));

    const imsPlex = "/";
    let resource = ImsConstants.URL + ImsConstants.PROGRAM;

    // names is not required; defaults to all programs
    if (parms.names !== undefined) {
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
    }

    // if no attributes default to ALL
    if (parms.attributes !== undefined) {
        if (parms.attributes.length > 0) {
            // 'attributes' text must be lower case
            resource = resource + delimiter + "attributes=";
            for (let i = 0; i < parms.attributes.length; i++) {
                if (i === 0) {
                    resource = resource + encodeURIComponent(parms.attributes[i]);
                } else {
                    resource = resource + "," + encodeURIComponent(parms.attributes[i]);
                }
            }
        }
        delimiter = "&";
    }
    else {
        resource = resource + delimiter + "attributes=ALL";
        delimiter = "&";
    }

    // if status specified, add
    if (parms.status !== undefined) {
        if (parms.status.length > 0) {
            // 'status' text must be lower case
            resource = resource + delimiter + "status=";
            for (let i = 0; i < parms.status.length; i++) {
                if (i === 0) {
                    resource = resource + encodeURIComponent(parms.status[i]);
                } else {
                    resource = resource + "," + encodeURIComponent(parms.status[i]);
                }
            }
        }
        delimiter = "&";
    }

    // check if route specified
    if (parms.route !== undefined) {
        if (parms.status.length > 0) {
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
    }

    return ImsRestClient.getExpectJSON(session, resource, []);
}

/**
 * Query program in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IResourceParms} parms - parameters for querying a program
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function queryTransaction(session: AbstractSession, parms: IQueryTransactionParms): Promise<IIMSApiResponse> {
    // ImperativeExpect.toBeDefinedAndNonBlank(parms.names, "IMS Transaction name", "IMS transaction name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to query resource(s) with the following parameters:\n%s", JSON.stringify(parms));

    const imsPlex = "/";
    let imsProgram = "/";

    if (parms.attributes != null) {
        imsProgram = imsProgram + delimiter + "SHOW(" + encodeURIComponent(parms.attributes[0]) + ")";
        delimiter = "&";
    }

    return ImsRestClient.getExpectJSON(session, imsProgram, []);
}
