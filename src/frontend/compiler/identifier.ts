import { TextEncoder } from "util";
import { OpCode } from "../opcode";
import { Token, TokenType } from "../token";
import { compileSize } from "./size";

export function compileIdentifier(identifier: Token) {
    const bytes = [OpCode.OpIdentifier] as number[];

    if (identifier.type !== TokenType.Identifier) throw new TypeError(`Token type is not 'identifier'.`);

    bytes.push(...compileSize(identifier.lexeme.length));

    bytes.push(...new TextEncoder().encode(identifier.lexeme));

    return bytes;
}
