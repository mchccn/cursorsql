import { inspect } from "util";
import { Compiler } from "./compiler";
import { OpCode } from "./opcode";
import { Parser } from "./parser";
import { Scanner } from "./scanner";

const debug = {
    parse: (statement: string) =>
        console.log(inspect(new Parser(new Scanner(statement).scanTokens()).parseTokens(), false, Infinity, true)),
    compile: (statement: string) =>
        console.log(
            inspect(
                Array.from(Compiler.compile(statement))
                    .map((b) => `${b.toString(16).padStart(2, "0")} ${OpCode[b] ?? ""}`)
                    .join("\n"),
                false,
                Infinity,
                true
            )
        ),
};

// debug.compile("select { col } from table;");
// debug.compile("delete table where { id = 1 };");
// debug.parse("update table { id 0, col 2 };");
debug.parse("create table { id u8 max 0 unique, name str };");
