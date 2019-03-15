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

import { IImperativeError, RestClient, Session } from "@zowe/imperative";
import { ImsRestClient } from "../../../src";

describe("ImsRestClient tests", () => {

    const dummySession = new Session({hostname: "dummy"});
    const testEndpoint = "testing";
    const dummyHeaders = [{testEndpoint}];

    const restClientExpect = jest.spyOn(RestClient, "getExpectString");

    beforeEach(() => {
        restClientExpect.mockClear();
    });

    it("should delete stack from any IMS errors before presenting them to users", () => {
        const imsRestClient = new ImsRestClient(dummySession);
        const shouldNotDeleteMessage = "This should not be deleted";
        const shouldDeleteMessage = "This should be deleted";
        const error: IImperativeError = {
            msg: "hello",
            causeErrors: JSON.stringify({
                stack: shouldDeleteMessage,
                shouldNotDelete: shouldNotDeleteMessage
            })
        };
        const processedError = ((imsRestClient as any).processError(error));
        expect(processedError.msg).toContain(shouldNotDeleteMessage);
        expect(processedError.msg.indexOf()).toEqual(-1);

    });
});
