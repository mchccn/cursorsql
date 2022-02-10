import { expect } from "chai";
import { compileComparison } from "../src/frontend/compiler/comparison";
import { compileConstraint } from "../src/frontend/compiler/constraint";
import { compileListLike } from "../src/frontend/compiler/listlike";
import { compileModifier } from "../src/frontend/compiler/modifier";
import { compileSize } from "../src/frontend/compiler/size";
import { OpCode } from "../src/frontend/opcode";
import { TokenType } from "../src/frontend/token";

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
            expect(e).to.be.an.instanceof(RangeError, "compileSize did not throw a range error");
        }
    });
});

describe("compileListLike", () => {
    it("should compile an empty list correctly", () => {
        expect(compileListLike([])).to.deep.equal(
            [OpCode.OpUInt32, 0, 0, 0, 0],
            "compileListLike incorrectly compiled an empty list"
        );
    });

    it("should compile an empty list with allow-empty on", () => {
        expect(compileListLike([], true)).to.deep.equal(
            [],
            "compileListLike incorrectly compiled an empty list with allow-empty enabled"
        );
    });

    it("should compile a simple list", () => {
        expect(compileListLike([4, 2, 0, 6, 9])).to.deep.equal(
            [OpCode.OpUInt32, 0, 0, 0, 5, 4, 2, 0, 6, 9],
            "compileListLike failed to compile a simple list"
        );
    });

    it("should still compile a simple list with allow-empty on", () => {
        expect(compileListLike([4, 2, 0, 6, 9], true)).to.deep.equal(
            [OpCode.OpUInt32, 0, 0, 0, 5, 4, 2, 0, 6, 9],
            "compileListLike failed to compile a simple list with allow-empty"
        );
    });
});

describe("compileConstraint", () => {
    it("should throw an error on invalid tokens", () => {
        try {
            compileConstraint({
                type: {
                    col: 0,
                    line: 0,
                    lexeme: "",
                    literal: "",
                    type: TokenType.Null,
                },
                value: [
                    {
                        col: 0,
                        line: 0,
                        lexeme: "",
                        literal: "",
                        type: TokenType.Null,
                    },
                ],
            });

            expect.fail("compileConstraint should have thrown a type error");
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError, "compileConstraint did not throw a type error");
        }
    });
});

describe("compileModifier", () => {
    it("should throw an error on invalid tokens", () => {
        try {
            compileModifier({
                type: {
                    col: 0,
                    line: 0,
                    lexeme: "",
                    literal: "",
                    type: TokenType.Null,
                },
                value: [
                    {
                        col: 0,
                        line: 0,
                        lexeme: "",
                        literal: "",
                        type: TokenType.Null,
                    },
                ],
            });

            expect.fail("compileModifier should have thrown a type error");
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError, "compileModifier did not throw a type error");
        }
    });
});

describe("compileComparison", () => {
    it("should throw an error on invalid tokens", () => {
        try {
            compileComparison({
                col: 0,
                line: 0,
                lexeme: "",
                literal: "",
                type: TokenType.Null,
            });

            expect.fail("compileComparison should have thrown a type error");
        } catch (e) {
            expect(e).to.be.an.instanceof(TypeError, "compileComparison did not throw a type error");
        }
    });
});
