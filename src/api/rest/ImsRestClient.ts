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

import { HTTP_VERB, IImperativeError, IRestOptions, Logger, RestClient, TextUtils } from "@zowe/imperative";
import { ImsSession } from "./ImsSession";

/**
 * Wrapper for invoke IMS API through the RestClient to perform common error
 * handling and checking and resolve promises according to generic types
 * @export
 * @class ImsRestClient
 * @extends {RestClient}
 */
export class ImsRestClient extends RestClient {
    /**
     * If the API request is successful, this value should be in
     * api_response2 in  the resultsummary object in the response
     */
    public static readonly IMS_SUCCESS_RESPONSE_1 = "1024";

    /**
     * If the API request is successful, this value should be in
     * api_response2 in  the resultsummary object in the response
     */
    public static readonly IMS_SUCCESS_RESPONSE_2 = "0";

    /**
     * Internal logger
     */
    private static mLogger: Logger;

    /**
     * Use the Zowe logger instead of the imperative logger
     * @return {Logger}
     */
    private static get log(): Logger {
        if (this.mLogger == null) {
            this.mLogger = Logger.getAppLogger();
        }
        return this.mLogger;
    }

    /**
     * Overridden request method implemented to append hostname, port, and plex headers to all IMS requests
     * Takes the same parameters as the vanilla Imperative 'performRest' method.
     */
    public request(options: IRestOptions): Promise<string> {
        if (options.reqHeaders == null) {
            options.reqHeaders = [];
        }

        // Log the resource and request info
        this.log.debug("\n\nResource: " + options.resource + "\nRequest: " + options.request + "\n");

        const imsSession = this.session as ImsSession;
        if (imsSession.imsConnectHost != null) {
            options.reqHeaders.push({hostname: imsSession.imsConnectHost});
        }
        if (imsSession.imsConnectPort != null) {
            options.reqHeaders.push({port: imsSession.imsConnectPort});
        }
        return super.request(options);
    }

    /**
     * Overridden performRest method implemented to append hostname, port, and plex headers to all IMS requests
     * Takes the same parameters as the vanilla Imperative 'performRest' method.
     * @param resource
     * @param request
     * @param reqHeaders
     * @param writeData
     */
    public performRest(resource: string, request: HTTP_VERB, reqHeaders?: any[], writeData?: any): Promise<string> {

        if (reqHeaders == null) {
            reqHeaders = [];
        }

        // Log the resource and request info
        this.log.debug("\n\nResource: " + resource + "\nRequest: " + request + "\n");

        const imsSession = this.session as ImsSession;
        if (imsSession.imsConnectHost != null) {
            reqHeaders.push({hostname: imsSession.imsConnectHost});
        }
        if (imsSession.imsConnectPort != null) {
            reqHeaders.push({port: imsSession.imsConnectPort});
        }
        return super.performRest(resource, request, reqHeaders, writeData);
    }

    /**
     * Process an error encountered in the rest client
     * @param {IImperativeError} original - the original error automatically built by the abstract rest client
     * @returns {IImperativeError} - the processed error with details added
     */
    protected processError(original: IImperativeError): IImperativeError {
        original.msg = "IMS Operations API Error:\n" + original.msg;
        let details = original.causeErrors;
        try {
            const jsonDetails = JSON.parse(details);
            // if we didn't get an error, make the parsed details part of the error
            details = TextUtils.prettyJson(jsonDetails, undefined, false);
            original.msg += "\n" + details;    // add the data string which is the original error
            return original;
        } catch (e) {
            // if there's an error, the causeErrors text is not json
            this.log.debug("Encountered an error trying to parse causeErrors as XML  - causeErrors is likely not JSON format");

            original.msg += "\n" + details; // add the data string which is the original error
            return original;
        }
    }
}
