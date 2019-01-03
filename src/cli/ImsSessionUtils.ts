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

import { ICommandArguments, ICommandOptionDefinition, IProfile, Logger, Session } from "@brightside/imperative";
import { ImsSession } from "../api/rest/ImsSession";

/**
 * Utility Methods for Zowe IMS plugin
 * @export
 */
export class ImsSessionUtils {

    public static IMS_CONNECTION_OPTION_GROUP = "IMS Connection Options";

    /**
     * Option used in profile creation and commands for hostname for IMS
     */
    public static IMS_OPTION_HOST: ICommandOptionDefinition = {
        name: "host",
        aliases: ["H"],
        description: "The IMS server host name.",
        type: "string",
        required: true,
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for port for IMS
     */
    public static IMS_OPTION_PORT: ICommandOptionDefinition = {
        name: "port",
        required: true,
        aliases: ["P"],
        description: "The IMS server port.",
        type: "number",
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for hostname for IMS
     */
    public static IMS_OPTION_REGION_HOST: ICommandOptionDefinition = {
        name: "region-host",
        aliases: ["rh"],
        description: "The hostname of the individual IMS region.",
        type: "string",
        required: true,
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for port for IMS
     */
    public static IMS_OPTION_REGION_PORT: ICommandOptionDefinition = {
        name: "region-port",
        required: true,
        aliases: ["rp"],
        description: "The port of the individual IMS region.",
        type: "number",
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for port for IMS
     */
    public static IMS_OPTION_PLEX: ICommandOptionDefinition = {
        name: "plex",
        required: true,
        aliases: ["x"],
        description: "The name of the IMS plex.",
        type: "number",
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for username / ID  for IMS
     */
    public static IMS_OPTION_USER: ICommandOptionDefinition = {
        name: "user",
        aliases: ["u"],
        description: "Mainframe (IMS) user name, which can be the same as your TSO login.",
        type: "string",
        required: true,
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for password/passphrase for IMS
     */
    public static IMS_OPTION_PASSWORD: ICommandOptionDefinition = {
        name: "password",
        aliases: ["pass"],
        description: "Mainframe (IMS) password, which can be the same as your TSO password.",
        type: "string",
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP,
        required: true
    };

    /**
     * Options related to connecting to IMS
     * These options can be filled in if the user creates a profile
     */
    public static IMS_CONNECTION_OPTIONS: ICommandOptionDefinition[] = [
        ImsSessionUtils.IMS_OPTION_HOST,
        ImsSessionUtils.IMS_OPTION_PORT,
        ImsSessionUtils.IMS_OPTION_REGION_HOST,
        ImsSessionUtils.IMS_OPTION_REGION_PORT,
        ImsSessionUtils.IMS_OPTION_PLEX,
        ImsSessionUtils.IMS_OPTION_USER,
        ImsSessionUtils.IMS_OPTION_PASSWORD
    ];

    /**
     * Given command line arguments, create a REST Client Session.
     * @static
     * @param {IProfile} args - The arguments specified by the user
     * @returns {Session} - A session for usage in the IMS REST Client
     */
    public static createBasicImsSessionFromArguments(args: ICommandArguments): ImsSession {
        this.log.debug("Creating a IMS session from arguments");
        return new ImsSession({
            type: "basic",
            hostname: args.host,
            port: args.port,
            user: args.user,
            plex: args.plex,
            regionHost: args.regionHost,
            regionPort: args.regionPort,
            password: args.password,
            basePath: args.basePath,
            strictSSL: false,
            protocol: "http"
        });
    }

    private static get log(): Logger {
        return Logger.getAppLogger();
    }

}
