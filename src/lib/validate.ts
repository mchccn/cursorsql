import { CQLParser } from "../types";
import { SyntaxTree } from "./shared";
import { KEYWORDS, CONSTRAINTS, MODIFIERS, CONDITIONS } from "../constants";

const SUPPORTED_KEYWORDS = [...KEYWORDS, ...CONSTRAINTS, ...MODIFIERS, ...CONDITIONS] as const;

export default function validate(tokens: CQLParser.Tokenized) {
    tokens.forEach(({ type, token }) => {
        if (type === "KEYWORD" && SUPPORTED_KEYWORDS.includes(token as typeof SUPPORTED_KEYWORDS[number])) {
            console.log(token);

            console.log(SyntaxTree[token as keyof typeof SyntaxTree]);
        }
    });

    return tokens;
}
