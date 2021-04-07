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

import {
    ImsConstants,
    ImsRestClient,
    ImsSession,
    queryRegion,
    IQueryRegionParms
} from "../../../../src";

describe("IMS - Query region", () => {

    const region = "region";
    const attributes = "ALL";
    const content = "This\nis\r\na\ntest";

    const queryRegionParms: IQueryRegionParms = {
        dc: true,
        region: true,
        route: undefined
    };

    const dummySession = new ImsSession({
        user: "fake",
        password: "fake",
        hostname: "fake",
        port: 8080,
        imsConnectHost: "fake",
        imsConnectPort: 9999,
        plex: "fake"
    });

    let error: any;
    let response: any;
    let endPoint: string;

    describe("success scenarios", () => {

        const deleteSpy = jest.spyOn(ImsRestClient, "getExpectJSON").mockReturnValue(content);

        beforeEach(() => {
            response = undefined;
            error = undefined;
            deleteSpy.mockClear();
            deleteSpy.mockImplementation(() => content);
        });

        it("should be able to query all regions without any parameters", async () => {

            // if no parameters, then /ims/apis/v1/region which
            // returns all regions with all columns
            endPoint = ImsConstants.URL + dummySession.plex + "/" + ImsConstants.REGION +
                "?dc=true&region=true";

            response = await queryRegion(dummySession);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint);
        });

        it("should be able to query regions with route name specified", async () => {
            endPoint = ImsConstants.URL +  dummySession.plex + "/" + ImsConstants.REGION +
                "?dc=true&region=true&route=IMS1";

            queryRegionParms.dc = true;
            queryRegionParms.region = true;
            queryRegionParms.route = ["IMS1"];

            response = await queryRegion(dummySession, queryRegionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint);
        });

        it("should be able to query regions with multiple route names specified", async () => {
            endPoint = ImsConstants.URL +  dummySession.plex + "/" + ImsConstants.REGION +
                "?dc=false&region=true&route=IMS1,IMS2";

            queryRegionParms.dc = false;
            queryRegionParms.region = true;
            queryRegionParms.route = ["IMS1","IMS2"];

            response = await queryRegion(dummySession, queryRegionParms);

            expect(response).toContain(content);
            expect(deleteSpy).toHaveBeenCalledWith(dummySession, endPoint);
        });


    });
});
