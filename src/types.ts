export namespace CQLServer {
    export interface InitOptions {
        encoding?: Parameters<Buffer["toString"]>[0];
        endpoint?: string;
    }
}

export namespace CQLParser {
    export type TokenType = "NAME" | "CLAUSE" | "KEYWORD" | "LITERAL" | "STAR" | "SEMICOLON" | "TYPE" | "CONSTRAINT";

    export type Tokenized = { type: TokenType; token: string | string[] }[];

    export interface BaseSyntaxDescriptor {
        optional?: boolean;
        validator?: RegExp;
        name: string;
    }

    export interface TypedSyntaxDescriptor extends BaseSyntaxDescriptor {
        types: TokenType[];
    }
    export interface BranchedSyntaxDescriptor extends BaseSyntaxDescriptor {
        or: SyntaxDescriptor[][];
    }
    export interface RefSyntaxDescriptor extends BaseSyntaxDescriptor {
        reference: string;
    }

    export type SyntaxDescriptor = TypedSyntaxDescriptor | RefSyntaxDescriptor | BranchedSyntaxDescriptor;
}
