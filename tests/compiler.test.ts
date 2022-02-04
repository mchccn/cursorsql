import { expect } from "chai";
import { compileSize } from "../src/frontend/compiler/size";

describe("compileSize", () => {
    it("should correctly compile a range of integers", () => {
        for (let i = 1; i < 2 ** 32 - 1; i *= 10)
            expect(
                compileSize(i)
                    .map((b) => b.toString(16).padStart(2, "0"))
                    .slice(1)
                    .join("")
                    .replace(/^(0+)/, "")
            ).to.equal(i.toString(16), `compileSize failed for '${i}'`);
    });

    it("should result in a range error if input is invalid", () => {
        try {
            compileSize(-1);

            expect.fail("compileSize should have thrown a range error");
        } catch (e) {
            expect(e).to.be.an.instanceof(RangeError);
        }
    });
});
