import { CQLParser } from "../types";

export default function validate(tokens: CQLParser.Tokenized) {
    tokens.forEach(({ type, token }) => {});

    return tokens;
}
