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

/**
 * Query program in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IQueryProgramParms} parms - parameters for querying a program
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function queryProgram(session: ImsSession, parms?: IQueryProgramParms): Promise<IIMSApiResponse> {

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to query program(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsSessionUtils.getUrl(session.ISession.basePath) + session.plex + "/" + ImsConstants.PROGRAM;

    // name is not required; defaults to all programs
    if ((parms !== undefined) && (parms.name !== undefined)) {
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
    }

    // if no attributes default to ALL
    if ((parms !== undefined) && (parms.attributes !== undefined)) {
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
    } else {
        resource = resource + delimiter + "attributes=ALL";
        delimiter = "&";
    }

    if (parms !== undefined) {
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
            if (parms.route.length > 0) {
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
    }
    return ImsRestClient.getExpectJSON(session, resource);
}

/**
 * Query transaction in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IQueryTransactionParms} parms - parameters for querying a transaction
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function queryTransaction(session: ImsSession, parms?: IQueryTransactionParms): Promise<IIMSApiResponse> {

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to query transaction(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsSessionUtils.getUrl(session.ISession.basePath) + session.plex + "/" + ImsConstants.TRANSACTION;

    // name is not required; defaults to all transactions
    if ((parms !== undefined) && (parms.name !== undefined)) {
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
    }

    // if no attributes take no default; default will be determined in 'Transaction.handler.ts'
    if ((parms !== undefined) && (parms.attributes !== undefined)) {
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

    if (parms !== undefined) {
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
            if (parms.route.length > 0) {
                // 'route' text must be lower case
                resource = resource + delimiter + "route=";
                for (let i = 0; i < parms.route.length; i++) {
                    if (i === 0) {
                        resource = resource + encodeURIComponent(parms.route[i]);
                    } else {
                        resource = resource + "," + encodeURIComponent(parms.route[i]);
                    }
                }
                delimiter = "&";
            }
        }

        // check if class specified
        if (parms.class !== undefined) {
            if (parms.class.length > 0) {
                // 'class' text must be lower case
                resource = resource + delimiter + "class=";
                for (let i = 0; i < parms.class.length; i++) {
                    if (i === 0) {
                        resource = resource + encodeURIComponent(parms.class[i].toString());
                    } else {
                        resource = resource + "," + encodeURIComponent(parms.class[i].toString());
                    }
                }
                delimiter = "&";
            }
        }

        // check if qcntcomp specified
        if (parms.qcntcomp !== undefined) {
            if (parms.qcntcomp.length > 0) {
                // 'qcntcomp' text must be lower case
                resource = resource + delimiter + "qcntcomp=";
                for (let i = 0; i < parms.qcntcomp.length; i++) {
                    if (i === 0) {
                        resource = resource + encodeURIComponent(parms.qcntcomp[i]);
                    } else {
                        resource = resource + "," + encodeURIComponent(parms.qcntcomp[i]);
                    }
                }
                delimiter = "&";
            }
        }

        // check if qcntval specified
        if (parms.qcntval !== undefined) {
            // 'qcntval' text must be lower case
            resource = resource + delimiter + "qcntval=" + parms.qcntval;
            delimiter = "&";
        }

        // check if conv specified
        if (parms.conv !== undefined) {
            // 'conv' text must be lower case
            resource = resource + delimiter + "conv=" + parms.conv;
            delimiter = "&";
        }

        // check if fp specified
        if (parms.fp !== undefined) {
            // 'fp' text must be lower case
            resource = resource + delimiter + "fp=" + parms.fp;
            delimiter = "&";
        }

        // check if remote specified
        if (parms.remote !== undefined) {
            // 'remote' text must be lower case
            resource = resource + delimiter + "remote=" + parms.remote;
            delimiter = "&";
        }

        // check if resp specified
        if (parms.resp !== undefined) {
            // 'resp' text must be lower case
            resource = resource + delimiter + "resp=" + parms.resp;
        }
    }
    return ImsRestClient.getExpectJSON(session, resource);
}

/**
 * Query region in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IQueryTransactionParms} parms - parameters for querying a region
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function queryRegion(session: ImsSession, parms?: IQueryRegionParms): Promise<IIMSApiResponse> {

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to query transaction(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsSessionUtils.getUrl(session.ISession.basePath) + session.plex + "/" + ImsConstants.REGION;

    if (parms !== undefined) {
        // dc value is not required; defaults to true
        if (parms.dc !== undefined) {
            // 'dc' text must be lower case
            resource = resource + delimiter + "dc=";
            resource = resource + (parms.dc === true ? "true" : "false");
            delimiter = "&";
        }

        // region value is not required; defaults to true
        if (parms.region !== undefined) {
            // 'region' text must be lower case
            resource = resource + delimiter + "region=";
            resource = resource + (parms.region === true ? "true" : "false");
            delimiter = "&";
        }
    }
    else {
        resource = resource + delimiter + "dc=true&region=true";
        delimiter = "&";
    }

    // check if route specified
    if ((parms !== undefined) && (parms.route !== undefined)) {
        if (parms.route.length > 0) {
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
    return ImsRestClient.getExpectJSON(session, resource);
}
