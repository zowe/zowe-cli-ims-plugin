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

/**
 * Utility function for constructing a query string out of an object
 * @param {object} parms - parameters for querying
 * @param {object} defaults - default values for querying
 * @param {object} aliases - aliases for querying
 * @returns {string} query string constructed from
 */
 export function getQueryFromParms(
    parms: {[key: string]: string} = {},
    defaults: {[key: string]: any} = {},
    aliases: {[key: string]: string} = {}): string
{
    let delimiter = "?"; // initial delimiter
    let resource = "";
    for (const [key, value] of Object.entries(parms)) {
        if (value != null && (typeof value === "boolean" || typeof value === "number" || value.length > 0)) {
            resource = resource + delimiter + (aliases[key] ?? key) + "=";

            if (Array.isArray(value)) {
                resource = resource + value.map(encodeURIComponent).join(",");
            } else {
                resource = resource + encodeURIComponent(value);
            }
            delimiter = "&";
        }
    }

    for (const [key, value] of Object.entries(defaults)) {
        if (parms[key] == null) {
            resource = resource + delimiter + (aliases[key] ?? key) + "=" + value;
            delimiter = "&";
        }
    }
    return resource;
}
