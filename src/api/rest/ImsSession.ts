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

import { Session } from "@brightside/imperative";
import { IImsSession } from "../doc/IImsSession";

export class ImsSession extends Session {
  /**
   * The host for the specific IMS region
   */
  public regionHost: string;

  /**
   * The port for the specific IMS region
   */
  public regionPort: number;

  /**
   * The name of the IMS Plex
   */
  public plex: string;

  constructor(iSession: IImsSession) {
    super(iSession);
    this.regionHost = iSession.regionHost;
    this.regionPort = iSession.regionPort;
    this.plex = iSession.plex;
  }

}
