import { compileSize } from "./size";

export function compileListLike(list: number[]) {
    return [...compileSize(list.length), ...list];
}
