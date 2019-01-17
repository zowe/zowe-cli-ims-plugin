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
 * Interface representing parameters for the queryTransaction API
 */
export interface IQueryTransactionParms {
    /**
     * TODO The swagger doc is missing the description info
     * Specifies the 1-8 character name of the transaction.
     * Wildcards can be specified in the name.
     * The name is a repeatable parameter.
     * The default is NAME(*) which returns all program resources.
     */
    names?: string[];

    /**
     * Specifies the transaction output fields to be returned.
     * The transaction name is always returned, along with the name of the IMS™
     * that created the output, the region type, and the completion code.
     *
     * AAvailable values : AFFIN, ALL, AOCMD, CLASS, CMTMODE, CONV, CPRI,
     * DCLWA, DEFN, DEFNTYPE, DIRROUTE, EDITRTN, EDITUC, EMHBSZ, EXPRTIME,
     * FP, GLOBAL, IMSID, INQ, LCT, LOCAL, LPRI, MAXRGN, MODEL, MSGTYPE,
     * MSNAME, NPRI, PARLIM, PGM, PLCT, PLCTTIME, PSB, QCNT, RECOVER,
     * REMOTE, RESP, RGC, SEGNO, SEGSZ, SERIAL, SPASZ, SPATRUNC, STATUS,
     * TIMESTAMP, TRANSTAT, WFI, WORK, EXPORTNEEDED
     */
    attributes?: string[];

    /**
     * Selects transactions for display that possess at least one of the
     * specified transaction status. This selection allows for additional
     * filtering by transaction status. The transaction status is returned
     * as output, even if the SHOW(STATUS) was not specified.
     *
     * Available values : AFFIN, BAL, CONV, CPIC, DYN, IOPREV, LCK,
     * NOTINIT, QERR, QSTP, SUSPEND, STOQ, STOSCHD, TRACE, USTO
     */
    status?: string[];

    /**
     *
     */
    route?: string[];

    /**
     *
     */
    class?: number[];

    /**
     *
     * Available values : LT, LE, GT, GE, EQ, NE
     */
    qcntcomp?: string[];

    /**
     *
     */
    qcntval?: string[];

    /**
     *
     * Available values : N, Y
     */
    conv?: string;

    /**
     *
     * Available values : E, N, P
     */
    fp?: string;

    /**
     *
     * Available values : N, Y
     */
    remote?: string;

    /**
     *
     * Available values : N, Y
     */
    resp?: string;
}
