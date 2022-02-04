import { Scanner } from "./scanner";
import { CreateStatement, DeleteStatement, Filter, InsertStatement, Modifier, SelectStatement, Statement, UpdateStatement, UpsertStatement } from "./statement";
import { Token, TokenType } from "./token";

export class Parser {
    private static readonly parseMap = new Map<TokenType, (p: Parser) => Statement>([
        [TokenType.Create, (p) => p.parseCreate()],
        [TokenType.Insert, (p) => p.parseInsert()],
        [TokenType.Select, (p) => p.parseSelect()],
        [TokenType.Upsert, (p) => p.parseUpsert()],
        [TokenType.Update, (p) => p.parseUpdate()],
        [TokenType.Delete, (p) => p.parseDelete()],
    ]);

    public constructor(private readonly tokens: Token[]) {}

    public parseTokens(): Statement {
        if (!this.tokens.length) throw new SyntaxError(`Statement is missing.`);

        if (![TokenType.Create, TokenType.Insert, TokenType.Select, TokenType.Upsert, TokenType.Update, TokenType.Delete].includes(this.tokens[0].type))
            throw new SyntaxError(`Expected beginning of statement, instead found '${this.tokens[0].lexeme}'.`);

        this.validateBrackets();

        if (this.tokens[this.tokens.length - 1]?.type !== TokenType.Semicolon) throw new SyntaxError(`Statements must end with a semicolon.`);

        this.tokens.pop();

        const { type } = this.tokens.shift()!;

        const p = Parser.parseMap.get(type);

        if (p) return p(this);

        throw new Error(`Assertion failed: unexpected type #${type}.`);
    }

    private parseCreate(): CreateStatement {}

    private parseInsert(): InsertStatement {}

    private parseSelect(): SelectStatement {
        const target = this.tokens[0];

        this.consume(`Expected '*' or '{', instead found ${target ? `'${target?.lexeme ?? ""}'` : `nothing`}.`, TokenType.Star, TokenType.LeftBracket);

        const table = this.tokens[0];

        this.consume(`Expected 'from', instead found ${table ? `'${table?.lexeme ?? ""}'` : `nothing`}.`, TokenType.From);

        return new SelectStatement(target.type === TokenType.Star ? "*" : [], this.tokens.shift()!, this.parseFilters(), this.parseModifiers());
    }

    private parseUpsert(): UpsertStatement {}

    private parseUpdate(): UpdateStatement {}

    private parseDelete(): DeleteStatement {}

    private parseFilters(): Filter[] {
        if (!this.tokens.length) return [];

        if (this.tokens[0].type === TokenType.LeftBracket) throw new SyntaxError(`Expected 'where' before filter, instead got '${this.tokens[0].lexeme}'.`);

        if (this.tokens[0].type !== TokenType.Where) return [];

        this.tokens.shift();

        this.consume(`Expected '{' after 'where'.`, TokenType.LeftBracket);

        const content = [] as Token[];

        let c = 0;

        while (this.tokens.length && (this.tokens[+0].type !== TokenType.RightBracket || c)) {
            const t = this.tokens.shift()!;

            if (t.type === TokenType.LeftBracket) c++;
            if (t.type === TokenType.RightBracket) c--;

            content.push(t);
        }

        this.consume(`Expected '}' after clause.`, TokenType.RightBracket);

        const bodies = [] as Token[][];

        let sect = [] as Token[];

        while (content.length) {
            while (content.length && content[0].type !== TokenType.Comma) sect.push(content.shift()!);

            content.shift();

            bodies.push(sect);

            sect = [];
        }

        return bodies.map((c) => {
            if (c.length > 3) throw new SyntaxError(`Comparison in filter has more than 3 components.`);

            const [col, type, value] = c;

            if (col.type !== TokenType.Identifier && !Scanner.keywords.get(col.lexeme)) throw new SyntaxError(`Left side must be an identifier.`);

            if (![TokenType.Greater, TokenType.GreaterEqual, TokenType.Lesser, TokenType.LesserEqual, TokenType.Equal, TokenType.NotEqual].includes(type.type))
                throw new SyntaxError(`Unrecognized comparator '${type.lexeme}'.`);

            if (![TokenType.Number, TokenType.Boolean, TokenType.String].includes(value.type)) throw new SyntaxError(`Right side must be a value.`);

            return { col, type, value };
        });
    }

    private parseModifiers(): Modifier[] {
        if (!this.tokens.length) return [];

        const modifiers = [];

        while (this.tokens.length && [TokenType.Sort, TokenType.Order, TokenType.Limit].includes(this.tokens[0].type)) {
            const type = this.tokens.shift()!;

            const value = [this.consume(`Expected number after '${type.lexeme}'.`, TokenType.Number)];

            modifiers.push({ type, value });
        }

        return modifiers;
    }

    private consume(msg: string, ...types: TokenType[]) {
        for (const type of types) {
            if (this.tokens[0]?.type === type) {
                return this.tokens.shift()!;
            }
        }

        throw new SyntaxError(msg);
    }

    private validateBrackets() {
        const stack = [] as number[];

        this.tokens.forEach((t, i) => {
            if (t.type === TokenType.LeftBracket) {
                stack.push(i);
            } else if (t.type === TokenType.RightBracket) {
                if (!stack.length) throw new SyntaxError(`Unmatched right bracket at line ${t.line}, column ${t.col}.`);

                stack.pop();
            }
        });

        if (stack.length) throw new SyntaxError(`Unmatched left bracket at line ${this.tokens[stack[0]].line}, column ${this.tokens[stack[0]].col}.`);
    }
}
