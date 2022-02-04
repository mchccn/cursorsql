import { OpCode } from "../opcode";
import { Token, TokenType } from "../token";

const cmpmap = new Map([
    [TokenType.Greater, OpCode.OpGreater],
    [TokenType.GreaterEqual, OpCode.OpGreaterEqual],
    [TokenType.Lesser, OpCode.OpLesser],
    [TokenType.LesserEqual, OpCode.OpLesserEqual],
    [TokenType.Equal, OpCode.OpEqual],
    [TokenType.NotEqual, OpCode.OpNotEqual],
]);

export function compileComparison(cmp: Token) {
    if (![TokenType.Greater, TokenType.GreaterEqual, TokenType.Lesser, TokenType.LesserEqual, TokenType.Equal, TokenType.NotEqual].includes(cmp.type))
        throw new TypeError(`Unrecognized comparator '${cmp.lexeme}'.`);

    return cmpmap.get(cmp.type)!;
}
