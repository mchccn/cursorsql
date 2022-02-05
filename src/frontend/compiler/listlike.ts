import { compileSize } from "./size";

export function compileListLike(list: number[], empty?: boolean) {
    if (!list.length && empty) return [];

    return [...compileSize(list.length), ...list];
}
