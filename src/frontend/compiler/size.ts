import { OpCode } from "../opcode";

export function compileSize(size: number) {
    const bytes = [] as number[];

    if (size < 0) throw new RangeError(`Size must be greater than or equal to 0.`);

    while (size > 255) {
        const byte = size & 0xff;

        bytes.push(byte);

        size = (size - byte) / 0xff;
    }

    bytes.push(size | 0);

    while (bytes.length < 4) bytes.push(0);

    bytes.unshift(OpCode.OpUInt32);

    return bytes;
}
