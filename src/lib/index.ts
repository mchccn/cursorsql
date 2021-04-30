import escape from "escape-string-regexp";
import { RESERVED_WORDS } from "../constants";
import { CQLParser } from "../types";

const TokenTypes: Record<CQLParser.TokenType, { name: CQLParser.TokenType; validator: RegExp }> = {
    NAME: {
        name: "NAME",
        validator: /^[a-zA-Z_$][0-9a-zA-Z_$]*$/,
    },
    CLAUSE: { name: "CLAUSE", validator: /^\{.*\}$/s },
    KEYWORD: { name: "KEYWORD", validator: new RegExp(`${RESERVED_WORDS.map(escape).join("|")}`) },
    LITERAL: { name: "LITERAL", validator: /.*/ },
} as const;

console.log(TokenTypes.KEYWORD.validator.source);

const SyntaxTree = {
    select: [],
} as const;

function query(strings: string | TemplateStringsArray, ...values: unknown[]) {
    const query = typeof strings === "string" ? strings : strings.reduce((q, str, i) => `${q}${str}${values[i] ?? ""}`, "");

    const tokens = (function tokenize(query) {
        const tokens: { type: CQLParser.TokenType; token: string }[] = [];

        query.split(/\s+/).forEach((token) => {
            if (RESERVED_WORDS.includes(token)) tokens.push({ type: TokenTypes.KEYWORD.name, token });
        });

        return tokens;
    })(query);

    console.log(tokens);
}

query`select * from table where { id 1; name cursors }; sdsfsdf`;
