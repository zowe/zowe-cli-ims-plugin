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
import { ImsConstants } from "../../constants";
import { IIMSApiResponse, IResourceParms } from "../../doc";

/**
 * Get resources on in IMS through REST API
 * @param {AbstractSession} session - the session to connect to CMCI with
 * @param {IResourceParms} parms - parameters for getting resources
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS resource name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function getResource(session: AbstractSession, parms: IResourceParms): Promise<IIMSApiResponse> {
    ImperativeExpect.toBeDefinedAndNonBlank(parms.name, "IMS Resource name", "IMS resource name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to get resource(s) with the following parameters:\n%s", JSON.stringify(parms));

    const imsPlex = "/";
    let cmciResource = "/";

    if (parms.criteria != null) {
        cmciResource = cmciResource + delimiter + "CRITERIA=(" + encodeURIComponent(parms.criteria) + ")";
        delimiter = "&";
    }

    if (parms.parameter != null) {
        cmciResource = cmciResource + delimiter + "PARAMETER=" + encodeURIComponent(parms.parameter);
    }
    return ImsRestClient.getExpectParsedXml(session, cmciResource, []);
}
