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

import { AbstractSession, ICommandHandler, IHandlerParameters, ImperativeError, IProfile, TextUtils } from "@brightside/imperative";
import { IIMSApiResponse } from "../api/doc/IIMSApiResponse";
import { ImsSessionUtils } from "./ImsSessionUtils";

/**
 * This class is used by the various ims handlers as the base class for their implementation.
 * All handlers should extend this class whenever possible
 */
export abstract class ImsBaseHandler implements ICommandHandler {

    /**
     * Local reference to commandParameters for convenience
     */
    protected params: IHandlerParameters;

    /**
     * This will grab the ims profile and create a session before calling the subclass
     * {@link ImsBaseHandler#processWithSession} method.
     *
     * @param {IHandlerParameters} commandParameters Command parameters sent by imperative.
     *
     * @returns {Promise<void>}
     */
    public async process(commandParameters: IHandlerParameters) {
        this.params = commandParameters;
        const profile = commandParameters.profiles.get("ims", false) || {};
        const session = ImsSessionUtils.createBasicImsSessionFromArguments(commandParameters.arguments);

        const response = await this.processWithSession(commandParameters, session, profile);

        commandParameters.response.progress.endBar(); // end any progress bars

        // Return as an object when using --response-format-json
        commandParameters.response.data.setObj(response);
    }

    /**
     * This is called by the {@link ImsBaseHandler#process} after it creates a session. Should
     * be used so that every class does not have to instantiate the session object.
     *
     * @param {IHandlerParameters} commandParameters Command parameters sent to the handler.
     * @param {AbstractSession} session The session object generated from the ims profile.
     * @param {IProfile} imsProfile The ims profile that was loaded for the command.
     *
     * @returns {Promise<IIMSApiResponse>} The response from the underlying ims api call.
     */
    public abstract async processWithSession(
        commandParameters: IHandlerParameters,
        session: AbstractSession,
        imsProfile: IProfile
    ): Promise<IIMSApiResponse>;

    /**
     * Check return codes for messages in case we don't receive a bad HTTP status code but
     * do receive a bad RC in one of the messages returned by the API
     */
    protected checkReturnCode(response: IIMSApiResponse) {
        let succeeded = true;
        const failingMessages = [];
        for (const messageID of Object.keys(response.messages)) {
            const message = response.messages[messageID];
            const HEXADECIMAL = 16;
            // if the return code on the message is not zero
            // the command did not succeed
            if (message.rc !== undefined && parseInt(message.rc, HEXADECIMAL) !== 0) {
                succeeded = false;
                failingMessages.push(message);
            }
        }
        if (!succeeded) {
            this.params.response.console.error(TextUtils.prettyJson(response.data));
            for (const failingMessage of failingMessages) {
                this.params.response.console.error(TextUtils.prettyJson(failingMessage));
            }
            this.params.response.data.setObj(response);
            throw new ImperativeError({msg: "Encountered a non-zero return code from IMS APIs", causeErrors: failingMessages});
        }
    }
}
