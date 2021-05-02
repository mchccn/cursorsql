import { CQLParser } from "../types";
import trim from "../utils/trim";
import { TokenTypes } from "./shared";

export default function tokenize(query: string) {
    const tokens: CQLParser.Tokenized = [];

    let toSkip = 0;

    const parts = query.split(/\s+/);

    const strings = query.match(/(?:(?<!\\)"([^"]|(?<=\\)")*(?<!\\)")/g) ?? [];

    console.log(strings);

    parts.forEach((part, i) => {
        const token = trim(part, ";");

        if (toSkip) {
            toSkip--;
            return;
        }

        if (TokenTypes.KEYWORD.validator.test(token)) tokens.push({ type: TokenTypes.KEYWORD.name, token });
        else if (TokenTypes.NAME.validator.test(token)) tokens.push({ type: TokenTypes.NAME.name, token });
        else if (TokenTypes.LITERAL.validator.test(token)) tokens.push({ type: TokenTypes.LITERAL.name, token });
        else if (TokenTypes.STAR.validator.test(token)) tokens.push({ type: TokenTypes.STAR.name, token });
        else if (token.startsWith("{")) {
            let idx = i + 1;

            {
                let toSkip = 0;

                const clause = [token];

                while (parts[idx] && !parts[idx].startsWith("}")) {
                    const current = parts[idx++];

                    if (toSkip) {
                        toSkip--;
                        continue;
                    }

                    if (typeof current !== "string") continue;

                    if (current.startsWith('"')) {
                        const s = strings.shift();

                        if (!s) throw new Error(`Unterminated string literal.`);

                        toSkip = s.split(/\s+/).length;

                        clause.push(trim(s, ";"));
                    } else clause.push(trim(current, ";"));

                    if (current.endsWith(";")) clause.push(";");
                }

                clause.push(parts[idx] ? trim(parts[idx], ";") : "");

                if (!clause[clause.length - 1]?.startsWith("}")) throw new SyntaxError(`Unterminated clause.`);

                tokens.push({ type: TokenTypes.CLAUSE.name, token: clause });
            }

            toSkip = idx - i;
        }

        if (parts[i]?.endsWith(";")) {
            tokens.push({ type: TokenTypes.SEMICOLON.name, token: ";" });
        }
    });

    return tokens;
}
