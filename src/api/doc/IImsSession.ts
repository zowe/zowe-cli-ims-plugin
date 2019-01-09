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

import { ISession } from "@brightside/imperative";

export interface IImsSession extends ISession {
    /**
     * The host for the instance of IMS connect
     */
    imsConnectHost: string;

    /**
     * The port for the instance of IMS connect
     */
    imsConnectPort: number;
    /**
     * The name of the IMS Plex
     */
    plex: string;
}
