import { OpCode } from "../opcode";
import { Modifier } from "../statement";
import { TokenType } from "../token";
import { compileSize } from "./size";

export function compileModifier(mod: Modifier) {
    if (![TokenType.Sort, TokenType.Order, TokenType.Limit].includes(mod.type.type))
        throw new TypeError(`Modifier type is not 'sort', 'order', or 'limit'.`);

    const bytes = [] as number[];

    switch (mod.type.type) {
        case TokenType.Sort:
            bytes.push(OpCode.OpSort, +(Math.sign(+mod.value[0].literal) > 0));
            break;
        case TokenType.Order:
            bytes.push(OpCode.OpOrder, +(Math.sign(+mod.value[0].literal) > 0));
            break;
        case TokenType.Limit:
            bytes.push(OpCode.OpLimit, ...compileSize(Number(mod.value[0].literal)));
            break;
    }

    return bytes;
}
