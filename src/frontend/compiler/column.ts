import { OpCode } from "../opcode";
import { Column } from "../statement";
import { TokenType } from "../token";
import { compileConstraint } from "./constraint";
import { compileIdentifier } from "./identifier";
import { compileListLike } from "./listlike";

const tokenMap = new Map([
    [TokenType.Int8, [OpCode.OpInt8]],
    [TokenType.Int16, [OpCode.OpInt16]],
    [TokenType.Int32, [OpCode.OpInt32]],
    [TokenType.Int64, [OpCode.OpInt64]],
    [TokenType.UInt8, [OpCode.OpUInt8]],
    [TokenType.UInt16, [OpCode.OpUInt16]],
    [TokenType.UInt32, [OpCode.OpUInt32]],
    [TokenType.UInt64, [OpCode.OpUInt64]],
    [TokenType.Float32, [OpCode.OpFloat32]],
    [TokenType.Float64, [OpCode.OpFloat64]],
    [TokenType.Bool, [OpCode.OpBool]],
    [TokenType.Str, [OpCode.OpStr]],
    [TokenType.NInt8, [OpCode.OpInt8, OpCode.OpNullable]],
    [TokenType.NInt16, [OpCode.OpInt16, OpCode.OpNullable]],
    [TokenType.NInt32, [OpCode.OpInt32, OpCode.OpNullable]],
    [TokenType.NInt64, [OpCode.OpInt64, OpCode.OpNullable]],
    [TokenType.NUInt8, [OpCode.OpUInt8, OpCode.OpNullable]],
    [TokenType.NUInt16, [OpCode.OpUInt16, OpCode.OpNullable]],
    [TokenType.NUInt32, [OpCode.OpUInt32, OpCode.OpNullable]],
    [TokenType.NUInt64, [OpCode.OpUInt64, OpCode.OpNullable]],
    [TokenType.NFloat32, [OpCode.OpFloat32, OpCode.OpNullable]],
    [TokenType.NFloat64, [OpCode.OpFloat64, OpCode.OpNullable]],
    [TokenType.NBool, [OpCode.OpBool, OpCode.OpNullable]],
    [TokenType.NStr, [OpCode.OpStr, OpCode.OpNullable]],
]);

export function compileColumn(col: Column) {
    const bytes = [] as number[];

    bytes.push(...compileIdentifier(col.col));

    bytes.push(...tokenMap.get(col.type.type)!);

    bytes.push(...compileListLike(col.constraints.flatMap(compileConstraint)));

    return bytes;
}
