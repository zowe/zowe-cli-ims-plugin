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
 * Interface representing parameters for the stopRegion API
 */
export interface IStopRegionParms {
    /**
     * Region Number Identifier. Can specify a Region Number or a Job Name, but NOT BOTH.
     */
    regNum?: number[];
    /**
     * Can specify a Region Number or a Job Name, but NOT BOTH.
     */
    jobName?: string;
    /**
     * If the transaction indicated by this parameter is running in the specified region to stop,
     * an error message is received at the master terminal, indicating an application
     * program abend. The region will remain active, but the transaction will be
     * stopped.
     * The stop region command will be ignored if the transaction is not currently scheduled
     * in the specified region to stop
     * Specify a transaction to abnormally terminate
     */
    abdump?: string;
    /**
     * Specify a transaction in wait-for-input (WFI) mode to stop its message processing within the specified region
     */
    transaction?: string;
    /**
     * Is used if the region cannot be stopped with a stop region --abdump
     * command and must be preceded by a stop region --abdump command.
     */
    cancel: boolean;
}
