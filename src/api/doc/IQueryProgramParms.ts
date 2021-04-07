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
 * Interface representing parameters for the queryProgram API
 */
export interface IQueryProgramParms {
    /**
     * Specifies the 1-8 character name of the program.
     * Wildcards can be specified in the name.
     * The name is a repeatable parameter.
     * The default is NAME(*) which returns all program resources.
     */
    name?: string[];

    /**
     * Specifies the program output fields to be returned.
     * The program name is always returned, along with the name of the IMS™
     * that created the output, the region type, and the completion code.
     *
     * Available values : ALL, BMPTYPE, DEFN, DEFNTYPE, DOPT, FP, GLOBAL,
     * IMSID, GPSB, LANG, LOCAL, MODEL, RESIDENT, SCHDTYPE, STATUS,
     * TIMESTAMP, TRANSTAT, EXPORTNEEDED, DB, RTC, TRAN, WORK
     */
    attributes?: string[];

    /**
     * Selects programs for display that possess at least one of the
     * specified program status. This selection allows for additional
     * filtering by program status. The program status is returned
     * as output, even if the SHOW(STATUS) was not specified.
     *
     * Available values : DB-NOTAVL, IOPREV, LOCK, NOTINIT, STOSCHD, TRACE
     */
    status?: string[];

    /**
     *
     */
    route?: string[];

    /**
     * Index signature
     */
    [key: string]: any;
}
