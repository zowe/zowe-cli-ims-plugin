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
 * Interface representing parameters for the update program API
 */
export interface IUpdateProgramParms {
    /**
     * Specifies the 1-8 character name of the program.
     * Wildcards can be specified in the name.
     * name is a repeatable parameter.
     */
    name: string[];

    /**
     *
     */
    route?: string[];

    /**
     * Use this option to start the program(s)
     * Available values are SCHD, TRACE and REFRESH
     */
    start?: string[];

    /**
     * Use this option to stop the program(s)
     * Available values are SCHD and TRACE
     */
    stop?: string[];

    /**
     *
     */
    bmptype?: string;

    /**
     *
     */
    dopt?: string;

    /**
     *
     */
    fp?: string;

    /**
     *
     */
    gpsb?: string;

    /**
     *
     */
    lang?: string;
    /**
     *
     */
    lock?: string;

    /**
     *
     */
    resident?: string;

    /**
     *
     */
    schdtype?: string;

    /**
     *
     */
    transtat?: string;

    /**
     *
     */
    option?: string;

}
