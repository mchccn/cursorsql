import { Data } from "../statement";
import { compileIdentifier } from "./identifier";
import { compileValue } from "./value";

export function compileData(data: Data) {
    const bytes = [] as number[];

    bytes.push(...compileIdentifier(data.col));

    bytes.push(...compileValue(data.value));

    return bytes;
}
