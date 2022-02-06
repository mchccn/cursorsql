import { OpCode } from "../opcode";
import { Constraint } from "../statement";
import { TokenType } from "../token";
import { compileValue } from "./value";

export function compileConstraint(con: Constraint) {
    if (![TokenType.Max, TokenType.Min, TokenType.Unique].includes(con.type.type))
        throw new TypeError(`Constraint type is not 'max', 'min', or 'unique'.`);

    const bytes = [] as number[];

    switch (con.type.type) {
        case TokenType.Max:
            bytes.push(OpCode.OpMax, ...compileValue(con.value[0]));
            break;
        case TokenType.Min:
            bytes.push(OpCode.OpMin, ...compileValue(con.value[0]));
            break;
        case TokenType.Unique:
            bytes.push(OpCode.OpUnique);
            break;
    }

    return bytes;
}
