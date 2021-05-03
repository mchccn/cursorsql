export namespace CQLServer {
    export interface InitOptions {
        encoding?: Parameters<Buffer["toString"]>[0];
        endpoint?: string;
    }
}

export namespace CQLParser {
    export type TokenType = "NAME" | "CLAUSE" | "KEYWORD" | "LITERAL" | "STAR" | "SEMICOLON" | "TYPE" | "CONSTRAINT" | "CONDITION" | `${ClauseType}_CLAUSE`;

    export type ClauseType = "LIST" | "PROP" | "DATA" | "META";

    export type Tokenized = { type: TokenType; token: string | string[] }[];

    export interface SyntaxDescriptor {
        optional?: boolean;
        types?: TokenType[];
        or?: SyntaxDescriptor[][];
        reference?: string;
        name: string;
    }
}
