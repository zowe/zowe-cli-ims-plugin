import { TestEnvironment } from "../../../../__src__/environment/TestEnvironment";
import { ITestEnvironment } from "../../../../__src__/environment/doc/response/ITestEnvironment";
import { runCliScript } from "../../../../__src__/TestUtils";
import { join } from "path";

let testEnvironment: ITestEnvironment;
describe("Start region command", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "start_region_cli_integration",
            installPlugin: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    it("Should start a region by specifying a member name", async () => {
        const result = runCliScript(join(__dirname, "__scripts__", "start_region_help.sh"), testEnvironment);
        expect(result.stderr.toString()).toEqual("");
        expect(result.status).toEqual(0);
        expect(result.stdout.toString()).toMatchSnapshot();
    });

});
