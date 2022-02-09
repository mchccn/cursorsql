import { OpCode } from "../opcode";

export function compileSize(size: number) {
    const bytes = [] as number[];

    if (size < 0) throw new RangeError(`Size must be greater than or equal to 0.`);

    while (size > 0) {
        const byte = size & 0xff;

        bytes.unshift(byte);

        size >>= 8;
    }

    while (bytes.length < 4) bytes.unshift(0);

    bytes.unshift(OpCode.OpUInt32);

    return bytes;
}
