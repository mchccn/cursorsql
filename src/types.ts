export namespace CQLServer {
    export interface InitOptions {
        encoding?: Parameters<Buffer["toString"]>[0];
        endpoint?: string;
    }
}

export namespace CQLParser {
    export type TokenType = "NAME" | "CLAUSE" | "KEYWORD" | "LITERAL";
}
