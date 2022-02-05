import { Compiler } from "./compiler";
import { OpCode } from "./opcode";

const debug = (statement: string) =>
    console.log(
        Array.from(Compiler.compile(statement))
            .map((b) => `${b.toString(16).padStart(2, "0")} ${OpCode[b] ?? ""}`)
            .join("\n")
    );

// debug("select { col } from table;");
debug("delete table where { id = 1 };");
