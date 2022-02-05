import { Compiler } from "./compiler";
import { OpCode } from "./opcode";

console.log(
    Array.from(Compiler.compile("select { col } from table where { id = 1};"))
        .map((b) => `${b.toString(16).padStart(2, "0")} ${OpCode[b] ?? ""}`)
        .join("\n")
);
