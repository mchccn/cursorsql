import { TextEncoder } from "util";
import { OpCode } from "../opcode";
import { Token, TokenType } from "../token";
import { compileListLike } from "./listlike";

export function compileValue(t: Token) {
    if (![TokenType.Number, TokenType.Boolean, TokenType.String].includes(t.type))
        throw new TypeError(`Token is not a value.`);

    if (t.type === TokenType.Number) {
        const dv = new DataView(new ArrayBuffer(64 / 8));

        if (t.literal.includes(".")) {
            dv.setFloat64(0, Number(t.literal));

            return [OpCode.OpFloat64, ...Array.from(new Uint8Array(dv.buffer))];
        }

        dv.setBigInt64(0, BigInt(t.literal), true);

        return [OpCode.OpInt64, ...Array.from(new Uint8Array(dv.buffer))];
    }

    if (t.type === TokenType.Boolean) return [OpCode.OpBoolean, t.literal === "true" ? 1 : 0];

    if (t.type === TokenType.String)
        return [OpCode.OpString, ...compileListLike([...new TextEncoder().encode(t.literal as string)])];

    throw void 0;
}
