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

// TODO - needs updated or removed for IMS
export interface IResourceParms {
    /**
     * The name of the resource
     */
    name: string;

    /**
     * Specifies the program output fields to be returned.
     *
     * Examples:
     *    "SHOW(ALL_"
     *    "SHOW(DEFN,LOCAL)"
     */
    show?: string;

}
