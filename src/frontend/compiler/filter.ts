import { Filter } from "../statement";
import { compileComparison } from "./comparison";
import { compileIdentifier } from "./identifier";
import { compileValue } from "./value";

export function compileFilter(f: Filter) {
    const identifier = compileIdentifier(f.col);

    const comparison = compileComparison(f.type);

    const value = compileValue(f.value);

    return [comparison, ...identifier, ...value];
}
