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

import { AbstractPluginLifeCycle, Logger } from "@zowe/imperative";

class PluginLifeCycle extends AbstractPluginLifeCycle {
    public postInstall(): void | Promise<void> {
        const deprecationMessage = "The IBM® IMS™ Plug-in for Zowe CLI is deprecated, " +
            "and will not receive additional security updates, bug fixes, or enhancements.";
        const consoleLogger = Logger.getConsoleLogger();
        const appLogger = Logger.getAppLogger();
        consoleLogger.warn(deprecationMessage);
        appLogger.warn(deprecationMessage);
    }

    public preUninstall(): void | Promise<void> {
        return;
    }
}

export = PluginLifeCycle;
