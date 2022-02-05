import { Token, TokenType } from "./token";

export class Scanner {
    public static readonly keywords = new Map([
        ["i8", TokenType.Int8],
        ["i16", TokenType.Int16],
        ["i32", TokenType.Int32],
        ["i64", TokenType.Int64],
        ["u8", TokenType.UInt8],
        ["u16", TokenType.UInt16],
        ["u32", TokenType.UInt32],
        ["u64", TokenType.UInt64],
        ["f32", TokenType.Float32],
        ["f64", TokenType.Float64],
        ["bool", TokenType.Bool],
        ["str", TokenType.Str],
        ["i8?", TokenType.NInt8],
        ["i16?", TokenType.NInt16],
        ["i32?", TokenType.NInt32],
        ["i64?", TokenType.NInt64],
        ["u8?", TokenType.NUInt8],
        ["u16?", TokenType.NUInt16],
        ["u32?", TokenType.NUInt32],
        ["u64?", TokenType.NUInt64],
        ["f32?", TokenType.NFloat32],
        ["f64?", TokenType.NFloat64],
        ["bool?", TokenType.NBool],
        ["str?", TokenType.NStr],
        ["sort", TokenType.Sort],
        ["order", TokenType.Order],
        ["limit", TokenType.Limit],
        ["where", TokenType.Where],
        ["max", TokenType.Max],
        ["min", TokenType.Min],
        ["unique", TokenType.Unique],
        ["create", TokenType.Create],
        ["insert", TokenType.Insert],
        ["select", TokenType.Select],
        ["upsert", TokenType.Upsert],
        ["update", TokenType.Update],
        ["delete", TokenType.Delete],
        ["from", TokenType.From],
    ]);

    private readonly tokens = [] as Token[];

    private start = 0;
    private current = 0;
    private line = 0;
    private col = 1;

    public constructor(public readonly source: string) {}

    public scanTokens() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        return this.tokens;
    }

    private scanToken() {
        const c = this.advance();
        switch (c) {
            case "{":
                this.addToken(TokenType.LeftBracket);
                break;
            case "}":
                this.addToken(TokenType.RightBracket);
                break;
            case ",":
                this.addToken(TokenType.Comma);
                break;
            case ";":
                this.addToken(TokenType.Semicolon);
                break;
            case "*":
                this.addToken(TokenType.Star);
                break;
            case "!":
                this.addToken(TokenType.NotEqual);
                break;
            case "=":
                this.addToken(TokenType.Equal);
                break;
            case "<":
                this.addToken(this.match("=") ? TokenType.LesserEqual : TokenType.Lesser);
                break;
            case ">":
                this.addToken(this.match("=") ? TokenType.GreaterEqual : TokenType.Greater);
                break;
            case '"':
                this.string();
                break;
            case " ":
            case "\r":
            case "\t":
                break;
            case "\n":
                this.line++;
                this.col = 1;
                break;
            case "-":
                if (this.isDigit(this.peek())) {
                    this.number();
                    break;
                }
            default:
                if (this.isDigit(c)) {
                    this.number();
                } else if (this.isAlpha(c)) {
                    this.identifier();
                } else {
                    throw new SyntaxError(`Unexpected character '${c}' at line ${this.line}, column ${this.col}.`);
                }
                break;
        }
    }

    private string() {
        while (this.peek() != '"' && !this.isAtEnd()) {
            if (this.peek() == "\n") this.line++;

            this.advance();
        }

        if (this.isAtEnd()) throw new SyntaxError(`Unterminated string literal.`);

        this.advance();

        const value = this.source.substring(this.start + 1, this.current - 1);

        this.addToken(TokenType.String, value);
    }

    private number() {
        while (this.isDigit(this.peek())) this.advance();

        if (this.peek() === "." && this.isDigit(this.peekNext())) {
            this.advance();

            while (this.isDigit(this.peek())) this.advance();
        }

        this.addToken(TokenType.Number, this.source.substring(this.start, this.current));
    }

    private identifier() {
        while (this.isAlphaNumeric(this.peek())) this.advance();

        if (this.peek() === "?") this.advance();

        const text = this.source.substring(this.start, this.current);

        const type = Scanner.keywords.get(text.toLowerCase()) ?? TokenType.Identifier;

        if (text.endsWith("?") && type === TokenType.Identifier)
            throw new SyntaxError(`Cannot make an identifier nullable with '?'.`);

        this.addToken(type);
    }

    private peek() {
        if (this.isAtEnd()) return "\0";

        return this.source[this.current];
    }

    private peekNext() {
        if (this.current + 1 >= this.source.length) return "\0";

        return this.source.charAt(this.current + 1);
    }

    private advance() {
        return this.source[this.current++];
    }

    private match(expected: string) {
        if (this.isAtEnd()) return false;

        if (this.source.charAt(this.current) != expected) return false;

        this.current++;

        return true;
    }

    private isDigit(c: string) {
        return /^[0-9]$/.test(c);
    }

    private isAlpha(c: string) {
        return /^[a-zA-Z_]$/.test(c);
    }

    private isAlphaNumeric(c: string) {
        return this.isAlpha(c) || this.isDigit(c);
    }

    private addToken(type: TokenType, literal?: string) {
        const text = this.source.substring(this.start, this.current);

        this.tokens.push(new Token(type, text, literal ?? "", this.line, this.col));

        this.col += text.length;
    }

    private isAtEnd() {
        return this.current >= this.source.length;
    }
}
