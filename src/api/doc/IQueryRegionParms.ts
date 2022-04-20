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
 * Interface representing parameters for the queryRegion API
 */
export interface IQueryRegionParms {
    /**
     * TODO The swagger doc is missing the description info
     * DC information
     * Available values : TRUE, FALSE (default TRUE)
     */
    dc?: boolean;

    /**
     * Include region information
     * Available values : TRUE, FALSE (default TRUE)
     */
    region?: boolean;

    /**
     *
     */
    route?: string[];

    /**
     * Index signature
     */
    [key: string]: any;
}
