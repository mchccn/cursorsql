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
        public readonly literal: unknown,
        public readonly line: number,
        public readonly col: number
    ) {}

    public toString() {
        return `${this.type} ${this.lexeme} ${this.literal}`;
    }
}
