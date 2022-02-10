import { expect } from "chai";
import { Scanner } from "../src/frontend/scanner";
import { TokenType } from "../src/frontend/token";

describe("Scanner", () => {
    it("should correctly scan tokens", () => {
        const scanner = new Scanner(`\
            i8 i16 i32 i64
            u8 u16 u32 u64
            f32 f64 bool str
            i8? i16? i32? i64?
            u8? u16? u32? u64?
            f32? f64? bool? str?
            * table
            0 123 4.2 69.420
            true false
            "string"
            null
            { } ,
            sort order limit where
            max min unique
            > >= < <= = !
            create insert select update upsert delete
            from
            ;
        `);

        expect(scanner.scanTokens().map(({ type }) => type)).to.deep.equal(
            [
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
                TokenType.Star,
                TokenType.Identifier,
                TokenType.Number,
                TokenType.Number,
                TokenType.Number,
                TokenType.Number,
                TokenType.Boolean,
                TokenType.Boolean,
                TokenType.String,
                TokenType.Null,
                TokenType.LeftBracket,
                TokenType.RightBracket,
                TokenType.Comma,
                TokenType.Sort,
                TokenType.Order,
                TokenType.Limit,
                TokenType.Where,
                TokenType.Max,
                TokenType.Min,
                TokenType.Unique,
                TokenType.Greater,
                TokenType.GreaterEqual,
                TokenType.Lesser,
                TokenType.LesserEqual,
                TokenType.Equal,
                TokenType.NotEqual,
                TokenType.Create,
                TokenType.Insert,
                TokenType.Select,
                TokenType.Update,
                TokenType.Upsert,
                TokenType.Delete,
                TokenType.From,
                TokenType.Semicolon,
            ],
            "Scanner did not correctly scan tokens"
        );
    });
});
