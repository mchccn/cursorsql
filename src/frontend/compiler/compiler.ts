import { OpCode } from "../opcode";
import { Parser } from "../parser";
import { Scanner } from "../scanner";
import {
    CreateStatement,
    DeleteStatement,
    InsertStatement,
    SelectStatement,
    Statement,
    UpdateStatement,
    UpsertStatement,
} from "../statement";
import { compileData } from "./data";
import { compileFilter } from "./filter";
import { compileIdentifier } from "./identifier";
import { compileListLike } from "./listlike";
import { compileModifier } from "./modifier";

export class Compiler {
    private static readonly compileMap = new Map<Statement["type"], (statement: Statement) => number[]>([
        ["create", Compiler.compileCreate],
        ["insert", Compiler.compileInsert],
        ["select", Compiler.compileSelect],
        ["upsert", Compiler.compileUpsert],
        ["update", Compiler.compileUpdate],
        ["delete", Compiler.compileDelete],
    ]);

    public static compile(source: string) {
        const tokens = new Scanner(source).scanTokens();

        const stmt = new Parser(tokens).parseTokens();

        return new Uint8Array(this.compileMap.get(stmt.type)!.bind(this)(stmt));
    }

    private static compileCreate(statement: Statement) {
        const bytes = [] as number[];

        if (statement.type !== "create") throw new TypeError(`Statement type is not 'create'.`);

        const stmt = statement as CreateStatement;

        bytes.push(...compileIdentifier(stmt.table));

        bytes.push(OpCode.OpReturn);

        return bytes;
    }

    private static compileInsert(statement: Statement) {
        const bytes = [OpCode.OpInsert] as number[];

        if (statement.type !== "insert") throw new TypeError(`Statement type is not 'insert'.`);

        const stmt = statement as InsertStatement;

        bytes.push(OpCode.OpReturn);

        return bytes;
    }

    private static compileSelect(statement: Statement) {
        const bytes = [OpCode.OpSelect] as number[];

        if (statement.type !== "select") throw new TypeError(`Statement type is not 'select'.`);

        const stmt = statement as SelectStatement;

        bytes.push(...compileIdentifier(stmt.table));

        bytes.push(
            ...(stmt.cols === "*"
                ? [OpCode.OpStar]
                : [OpCode.OpListClause, ...compileListLike(stmt.cols.flatMap(compileIdentifier))])
        );

        bytes.push(
            ...(stmt.filters.length ? [OpCode.OpWhere] : []),
            ...compileListLike(stmt.filters.flatMap(compileFilter), true)
        );

        bytes.push(...stmt.modifiers.flatMap(compileModifier));

        bytes.push(OpCode.OpReturn);

        return bytes;
    }

    private static compileUpsert(statement: Statement) {
        const bytes = [OpCode.OpUpsert] as number[];

        if (statement.type !== "upsert") throw new TypeError(`Statement type is not 'upsert'.`);

        const stmt = statement as UpsertStatement;

        bytes.push(...compileIdentifier(stmt.table));

        return bytes;
    }

    private static compileUpdate(statement: Statement) {
        const bytes = [OpCode.OpUpdate] as number[];

        if (statement.type !== "update") throw new TypeError(`Statement type is not 'update'.`);

        const stmt = statement as UpdateStatement;

        bytes.push(...compileIdentifier(stmt.table));

        bytes.push(OpCode.OpDataClause, ...compileListLike(stmt.update.flatMap(compileData)));

        bytes.push(
            ...(stmt.filters.length ? [OpCode.OpWhere] : []),
            ...compileListLike(stmt.filters.flatMap(compileFilter), true)
        );

        bytes.push(OpCode.OpReturn);

        return bytes;
    }

    private static compileDelete(statement: Statement) {
        const bytes = [OpCode.OpDelete] as number[];

        if (statement.type !== "delete") throw new TypeError(`Statement type is not 'delete'.`);

        const stmt = statement as DeleteStatement;

        bytes.push(...compileIdentifier(stmt.table));

        bytes.push(
            ...(stmt.filters.length ? [OpCode.OpWhere] : []),
            ...compileListLike(stmt.filters.flatMap(compileFilter), true)
        );

        bytes.push(...stmt.modifiers.flatMap(compileModifier));

        bytes.push(OpCode.OpReturn);

        return bytes;
    }
}
