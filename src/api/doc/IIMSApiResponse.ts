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
 * Interface representing API response from CMCI's web interface, parsed from XML to a javascript object
 * using the xml2js package.
 */

export interface IIMSApiResponse {
    /**
     * A list of objects returned from the API
     */
    data: any;
    /**
     * Error or success messages encountered during the execution of the request
     * A map that represents messages that are returned from OM after submitting the command.
     *
     */
    messages: {
        /**
         * The key is either the IMS member or OM that returned the message
         */
        [key: string]: {
            /**
             * Reason code text
             */
            rsntxt: string;
            /**
             * Message from OM. Usually returned only when there is an error
             */
            message: string;
            /**
             * Return code
             */
            rc: string;
            /**
             * The command executed
             */
            command: string;
            /**
             * Reason code
             */
            rsn: string;
        }
    };
}
