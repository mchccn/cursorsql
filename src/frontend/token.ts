export enum TokenType {
    Int8,
    Int16,
    Int32,
    Int64,
    UInt8,
    UInt16,
    UInt32,
    UInt64,
    Float32,
    Float64,
    Bool,
    Str,

    NInt8,
    NInt16,
    NInt32,
    NInt64,
    NUInt8,
    NUInt16,
    NUInt32,
    NUInt64,
    NFloat32,
    NFloat64,
    NBool,
    NStr,

    Star,
    Identifier,
    Number,
    Boolean,
    String,
    Null,

    LeftBracket,
    RightBracket,
    Comma,

    Sort,
    Order,
    Limit,
    Where,

    Max,
    Min,
    Unique,

    Greater,
    GreaterEqual,
    Lesser,
    LesserEqual,
    Equal,
    NotEqual,

    Create,
    Insert,
    Select,
    Upsert,
    Update,
    Delete,

    From,

    Semicolon,
}

export class Token {
    public constructor(
        public readonly type: TokenType,
        public readonly lexeme: string,
        public readonly literal: string,
        public readonly line: number,
        public readonly col: number
    ) {}

    public toString() {
        return `${this.type} ${this.lexeme} ${this.literal}`;
    }
}

export const coltypeTokens = [
    TokenType.Int8,
    TokenType.Int16,
    TokenType.Int32,
    TokenType.Int64,
    TokenType.UInt8,
    TokenType.UInt16,
    TokenType.UInt32,
    TokenType.UInt64,
    TokenType.Float32,
    TokenType.Float64,
    TokenType.Bool,
    TokenType.Str,
    TokenType.NInt8,
    TokenType.NInt16,
    TokenType.NInt32,
    TokenType.NInt64,
    TokenType.NUInt8,
    TokenType.NUInt16,
    TokenType.NUInt32,
    TokenType.NUInt64,
    TokenType.NFloat32,
    TokenType.NFloat64,
    TokenType.NBool,
    TokenType.NStr,
];

export const constraintTokens = [TokenType.Max, TokenType.Min, TokenType.Unique];

export const valueTokens = [TokenType.Number, TokenType.Boolean, TokenType.String, TokenType.Null];

export const statementTokens = [
    TokenType.Create,
    TokenType.Insert,
    TokenType.Select,
    TokenType.Upsert,
    TokenType.Update,
    TokenType.Delete,
];

export const comparisonTokens = [
    TokenType.Greater,
    TokenType.GreaterEqual,
    TokenType.Lesser,
    TokenType.LesserEqual,
    TokenType.Equal,
    TokenType.NotEqual,
];
