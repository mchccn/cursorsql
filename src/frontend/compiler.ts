// import { OpCode } from "./opcode";
import { Parser } from "./parser";
import { Scanner } from "./scanner";
import { CreateStatement, DeleteStatement, InsertStatement, SelectStatement, Statement, UpdateStatement, UpsertStatement } from "./statement";

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

        return new Uint8Array(this.compileMap.get(stmt.type)!(stmt));
    }

    private static compileCreate(statement: Statement) {
        const bytes = [] as number[];

        if (statement.type !== "create") throw new TypeError(`Statement type is not 'create'.`);

        const stmt = statement as CreateStatement;

        return bytes;
    }

    private static compileInsert(statement: Statement) {
        const bytes = [] as number[];

        if (statement.type !== "insert") throw new TypeError(`Statement type is not 'insert'.`);

        const stmt = statement as InsertStatement;

        return bytes;
    }

    private static compileSelect(statement: Statement) {
        const bytes = [] as number[];

        if (statement.type !== "select") throw new TypeError(`Statement type is not 'select'.`);

        const stmt = statement as SelectStatement;

        //

        return bytes;
    }

    private static compileUpsert(statement: Statement) {
        const bytes = [] as number[];

        if (statement.type !== "upsert") throw new TypeError(`Statement type is not 'upsert'.`);

        const stmt = statement as UpsertStatement;

        return bytes;
    }

    private static compileUpdate(statement: Statement) {
        const bytes = [] as number[];

        if (statement.type !== "update") throw new TypeError(`Statement type is not 'update'.`);

        const stmt = statement as UpdateStatement;

        return bytes;
    }

    private static compileDelete(statement: Statement) {
        const bytes = [] as number[];

        if (statement.type !== "delete") throw new TypeError(`Statement type is not 'delete'.`);

        const stmt = statement as DeleteStatement;

        return bytes;
    }
}
