import { inspect } from "util";
import { Compiler } from "../frontend/compiler";
import { OpCode } from "../frontend/opcode";
import { Parser } from "../frontend/parser";
import { Scanner } from "../frontend/scanner";

export const debug = {
    parse: (statement: string) =>
        console.log(inspect(new Parser(new Scanner(statement).scanTokens()).parseTokens(), false, Infinity, true)),
    compile: (statement: string) =>
        console.log(
            Array.from(Compiler.compile(statement))
                .map((b) => `${b.toString(16).padStart(2, "0")} ${OpCode[b] ?? ""}`)
                .join("\n")
        ),
    xxd: (statement: string) =>
        console.log(
            Array.from(Compiler.compile(statement))
                .map((b) => "0x" + b.toString(16).padStart(2, "0"))
                .join(", ")
        ),
} as const;
