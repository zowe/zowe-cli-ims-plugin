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

/**
 * Utility Methods for Brightside
 * @export
 */
export class ImsSession {

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
        group: ImsSession.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for port for IMS
     */
    public static IMS_OPTION_PORT: ICommandOptionDefinition = {
        name: "port",
        aliases: ["P"],
        description: "The IMS server port.",
        type: "number",
        defaultValue: 443,
        group: ImsSession.IMS_CONNECTION_OPTION_GROUP
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
        group: ImsSession.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for password/passphrase for IMS
     */
    public static IMS_OPTION_PASSWORD: ICommandOptionDefinition = {
        name: "password",
        aliases: ["pw"],
        description: "Mainframe (IMS) password, which can be the same as your TSO password.",
        type: "string",
        group: ImsSession.IMS_CONNECTION_OPTION_GROUP,
        required: true
    };

    /**
     * Options related to connecting to IMS
     * These options can be filled in if the user creates a profile
     */
    public static IMS_CONNECTION_OPTIONS: ICommandOptionDefinition[] = [
        ImsSession.IMS_OPTION_HOST,
        ImsSession.IMS_OPTION_PORT,
        ImsSession.IMS_OPTION_USER,
        ImsSession.IMS_OPTION_PASSWORD
    ];

    /**
     * Given a IMS profile, create a REST Client Session.
     * @static
     * @param {IProfile} profile - The IMS profile contents
     * @returns {Session} - A session for usage in the IMS REST Client
     */
    public static createBasicIMSSession(profile: IProfile): Session {
        this.log.debug("Creating a IMS session from the profile named %s", profile.name);
        return new Session({
            type: "basic",
            hostname: profile.host,
            port: profile.port,
            user: profile.user,
            password: profile.pass,
            basePath: profile.basePath,
            protocol: "http",
        });
    }

    /**
     * Given command line arguments, create a REST Client Session.
     * @static
     * @param {IProfile} args - The arguments specified by the user
     * @returns {Session} - A session for usage in the IMS REST Client
     */
    public static createBasicImsSessionFromArguments(args: ICommandArguments): Session {
        this.log.debug("Creating a IMS session from arguments");
        return new Session({
            type: "basic",
            hostname: args.host,
            port: args.port,
            user: args.user,
            password: args.password,
            basePath: args.basePath,
            strictSSL: false,
            protocol: "http",
        });
    }


    private static get log(): Logger {
        return Logger.getAppLogger();
    }
}
