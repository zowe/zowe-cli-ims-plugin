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

import { ConnectionPropsForSessCfg, ICommandArguments, ICommandOptionDefinition, ImperativeError, IProfile, ISession, Logger, SessConstants, Session } from "@zowe/imperative";
import { ImsConstants } from "../api";
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
        description: "The IMS Operations API server host name.",
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
        description: "The IMS Operations API server port.",
        type: "number",
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for hostname for IMS
     */
    public static IMS_OPTION_IMS_CONNECT_HOST: ICommandOptionDefinition = {
        name: "ims-connect-host",
        aliases: ["ich"],
        description: "The hostname of your instance of IMS Connect. This is typically the hostname " +
            "of the mainframe LPAR where IMS Connect is running.",
        type: "string",
        required: true,
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for port for IMS
     */
    public static IMS_OPTION_IMS_CONNECT_PORT: ICommandOptionDefinition = {
        name: "ims-connect-port",
        required: true,
        aliases: ["icp"],
        description: "The port of your instance of IMS Connect." +
            " This port can be found in your IMS Connect configuration file on the mainframe.",
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
        type: "string",
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for username / ID  for IMS
     */
    public static IMS_OPTION_USER: ICommandOptionDefinition = {
        name: "user",
        aliases: ["u"],
        description: "The web server user name where the IMS Operations API resides.",
        type: "string",
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for password/passphrase for IMS
     */
    public static IMS_OPTION_PASSWORD: ICommandOptionDefinition = {
        name: "password",
        aliases: ["pass"],
        description: "The web server user password where the IMS Operations API resides.",
        type: "string",
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP,
    };

    /**
     * Option used in profile creation and commands for base path setting for connecting to z/OSMF
     */
    public static IMS_OPTION_BASE_PATH: ICommandOptionDefinition = {
        name: "base-path",
        aliases: ["bp"],
        description: "The base path for your API mediation layer instance." +
            " Specify this option to prepend the base path to all z/OSMF resources when making REST requests." +
            " Do not specify this option if you are not using an API mediation layer.",
        type: "string",
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };
    /**
     * Option used in profile creation and commands for protocol for CMCI
     */
    public static IMS_OPTION_PROTOCOL: ICommandOptionDefinition = {
        name: "protocol",
        description: "Specifies protocol (http or https).",
        type: "string",
        defaultValue: "https",
        required: true,
        allowableValues: {values: ["http", "https"], caseSensitive: false},
        group: ImsSessionUtils.IMS_CONNECTION_OPTION_GROUP
    };

    /**
     * Options related to connecting to IMS
     * These options can be filled in if the user creates a profile
     */
    public static IMS_CONNECTION_OPTIONS: ICommandOptionDefinition[] = [
        ImsSessionUtils.IMS_OPTION_HOST,
        ImsSessionUtils.IMS_OPTION_PORT,
        ImsSessionUtils.IMS_OPTION_IMS_CONNECT_HOST,
        ImsSessionUtils.IMS_OPTION_IMS_CONNECT_PORT,
        ImsSessionUtils.IMS_OPTION_PLEX,
        ImsSessionUtils.IMS_OPTION_USER,
        ImsSessionUtils.IMS_OPTION_PASSWORD,
        ImsSessionUtils.IMS_OPTION_BASE_PATH,
        ImsSessionUtils.IMS_OPTION_PROTOCOL,
    ];

    public static async createSessCfgFromArgs(args: ICommandArguments, doPrompting = true): Promise<ImsSession> {
        this.log.debug("Creating a IMS session from arguments");
        let basePath = args.basePath ?? ImsConstants.BASE_PATH;

        // strip "/" before and after sessionBasePath
        // if (basePath.startsWith("/")) basePath = basePath.substring(1, basePath.length);
        // if (basePath.endsWith("/")) basePath = basePath.substring(0, basePath.length - 1);
        // if (!basePath.match(/ims\/api\/v1/))
        //   throw new ImperativeError({
        //     msg:
        //       "Make sure the base path value is: " + ImsConstants.BASE_PATH
        //   });

        let sessCfg: ISession = {
            hostname: args.host,
            port: args.port,
            rejectUnauthorized: args.rejectUnauthorized,
            basePath,
            protocol: args.protocol.toLowerCase() ?? "https"
        };

        if (args.user && args.password) {
            sessCfg.user = args.user;
            sessCfg.password = args.password;
            sessCfg.type = SessConstants.AUTH_TYPE_BASIC;
        } else if (args.tokenType && args.tokenValue) {
            sessCfg.type = SessConstants.AUTH_TYPE_TOKEN;
            sessCfg.tokenType = args.tokenType;
            sessCfg.tokenValue = args.tokenValue;
        }

        const sessCfgWithCreds = await ConnectionPropsForSessCfg.addPropsOrPrompt<ISession>(sessCfg, args, {doPrompting});

        return new ImsSession({
            ...sessCfgWithCreds,
            imsConnectHost: args.imsConnectHost,
            imsConnectPort: args.imsConnectPort,
            plex: args.plex
        });
    }

    public static getUrl(basePath: string) {
        return basePath === ImsConstants.URL ? "" : ImsConstants.URL
    }

    /**
     * Given command line arguments, create a REST Client Session.
     * @static
     * @param {IProfile} args - The arguments specified by the user
     * @returns {Session} - A session for usage in the IMS REST Client
     */
    public static createBasicImsSessionFromArguments(args: ICommandArguments): ImsSession {
        this.log.debug("Creating a IMS session from arguments");

        return new ImsSession({
            type: args.password && args.user? "basic": "none",
            hostname: args.host,
            port: args.port,
            user: args.user,
            plex: args.plex,
            imsConnectHost: args.imsConnectHost,
            imsConnectPort: args.imsConnectPort,
            password: args.password,
            basePath: args.basePath,
            strictSSL: false,
            protocol: args.protocol ? args.protocol : "https"
        });
    }

    private static get log(): Logger {
        return Logger.getAppLogger();
    }

}
