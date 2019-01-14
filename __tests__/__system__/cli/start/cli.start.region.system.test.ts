import { ITestEnvironment } from "../../../__src__/environment/doc/response/ITestEnvironment";
import { TestEnvironment } from "../../../__src__/environment/TestEnvironment";

let testEnvironment: ITestEnvironment;
describe("Start region command", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "start_region_cli",
            tempProfileTypes: ["ims"],
            installPlugin: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    it("Should start a region by specifying a member name", async () => {
        expect(true).toEqual(true); // insert real test
    });

});
