import { OpCode } from "../opcode";
import { Parser } from "../parser";
import { Scanner } from "../scanner";
import { CreateStatement, DeleteStatement, InsertStatement, SelectStatement, Statement, UpdateStatement, UpsertStatement } from "../statement";
import { compileComparison } from "./comparison";
import { compileIdentifier } from "./identifier";
import { compileModifier } from "./modifier";
import { compileSize } from "./size";
import { compileValue } from "./value";

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

        if (stmt.cols === "*") {
            bytes.push(OpCode.OpStar);
        } else {
            const list = stmt.cols.flatMap((t) => compileIdentifier(t));

            bytes.push(OpCode.OpListClause, ...compileSize(list.length), ...list);
        }

        if (stmt.filters.length) {
            const list = stmt.filters.flatMap((f) => {
                const identifier = compileIdentifier(f.col);

                const comparison = compileComparison(f.type);

                const value = compileValue(f.value);

                return [comparison, OpCode.OpIdentifier, ...compileSize(identifier.length), ...identifier, ...value];
            });

            bytes.push(OpCode.OpWhere, ...compileSize(list.length), ...list);
        }

        if (stmt.modifiers.length) {
            const mods = stmt.modifiers.flatMap((m) => compileModifier(m));

            bytes.push(...mods);
        }

        bytes.push(OpCode.OpReturn);

        return bytes;
    }

    private static compileUpsert(statement: Statement) {
        const bytes = [OpCode.OpUpsert] as number[];

        if (statement.type !== "upsert") throw new TypeError(`Statement type is not 'upsert'.`);

        const stmt = statement as UpsertStatement;

        return bytes;
    }

    private static compileUpdate(statement: Statement) {
        const bytes = [OpCode.OpUpdate] as number[];

        if (statement.type !== "update") throw new TypeError(`Statement type is not 'update'.`);

        const stmt = statement as UpdateStatement;

        bytes.push(OpCode.OpReturn);

        return bytes;
    }

    private static compileDelete(statement: Statement) {
        const bytes = [OpCode.OpDelete] as number[];

        if (statement.type !== "delete") throw new TypeError(`Statement type is not 'delete'.`);

        const stmt = statement as DeleteStatement;

        bytes.push(OpCode.OpReturn);

        return bytes;
    }
}
