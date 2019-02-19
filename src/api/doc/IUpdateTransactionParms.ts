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
 * Interface representing parameters for the update transaction API
 */
export interface IUpdateTransactionParms {
    /**
     * Specifies the 1-8 character name of the transaction.
     * Wildcards can be specified in the name.
     * names is a repeatable parameter.
     */
    names: string[];

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
     */
    option?: string;

    /**
     *
     */
    scope?: string[];

    /**
     * Use this option to start the program(s)
     * Available values are Q, SCHD, SUSPEND, and TRACE
     */
    start?: string[];

    /**
     * Use this option to stop the program(s)
     * Available values are Q, SCHD and TRACE
     */
    stop?: string[];

    /**
     *
     */
    aocmd?: string;

    /**
     *
     */
    setClass?: number;

    /**
     *
     */
    cmtmode?: string;

    /**
     *
     */
    conv?: string;

    /**
     *
     */
    cpri?: number;

    /**
     *
     */
    dclwa?: string;

    /**
     *
     */
    dirroute?: string;

    /**
     *
     */
    editrtn?: string;

    /**
     *
     */
    editruc?: string;

    /**
     *
     */
    emhbsz?: number;

    /**
     *
     */
    exprtime?: number;

    /**
     *
     */
    fp?: string;

    /**
     *
     */
    inq?: string;

    /**
     *
     */
    lct?: number;

    /**
     *
     */
    lpri?: number;

    /**
     *
     */
    lock?: string;

    /**
     *
     */
    maxrgn?: number;

    /**
     *
     */
    msgtype?: string;

    /**
     *
     */
    msname?: string;

    /**
     *
     */
    npri?: number;

    /**
     *
     */
    parlim?: number;

    /**
     *
     */
    pgm?: string;

    /**
     *
     */
    plct?: number;

    /**
     *
     */
    plctime?: number;

    /**
     *
     */
    recover?: string;

    /**
     *
     */
    remote?: string;

    /**
     *
     */
    resp?: string;

    /**
     *
     */
    segno?: number;

    /**
     *
     */
    segsz?: number;

    /**
     *
     */
    serial?: string;

    /**
     *
     */
    sidl?: number;

    /**
     *
     */
    sidr?: number;

    /**
     *
     */
    spasz?: number;

    /**
     *
     */
    spatrunc?: string;

    /**
     *
     */
    transtat?: string;

    /**
     *
     */
    wifi?: string;
}
