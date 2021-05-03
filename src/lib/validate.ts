import { CONDITIONS, CONSTRAINTS, KEYWORDS, MODIFIERS } from "../constants";
import { CQLParser } from "../types";
import { SyntaxTree, TokenTypes } from "./shared";

const SUPPORTED_KEYWORDS = [...KEYWORDS, ...CONSTRAINTS, ...MODIFIERS, ...CONDITIONS] as const;

// ! BROKEN PLS FIX SOON REEE

export default function validate(tokens: CQLParser.Tokenized) {
    let toSkip = 0;

    console.log(tokens);

    tokens.forEach(({ type, token }, idx) => {
        if (toSkip) return toSkip--;

        if (type === "KEYWORD" && SUPPORTED_KEYWORDS.includes(token as typeof SUPPORTED_KEYWORDS[number])) {
            const tree = SyntaxTree[token as keyof typeof SyntaxTree];

            let treeToSkip = 0;

            tree.forEach(({ name, types, optional, or, reference }, i) => {
                if (treeToSkip) return treeToSkip--;

                const index = idx + i;

                const current = tokens[index];

                if (!current && tokens.slice(index).every((thing) => typeof thing === "undefined")) return (toSkip = index - idx);

                if (!optional && !current) throw new Error(`No value was provided for '${name}'.`);

                if (types) {
                    let isValid = false;

                    loop: for (const type of types) {
                        console.log(type);

                        if (type === "CLAUSE") throw new Error(`Types cannot be generic clauses.`);

                        if (type.endsWith("_CLAUSE")) {
                            switch (type) {
                                case "DATA_CLAUSE": {
                                    isValid = true;
                                    break loop;
                                }
                                case "LIST_CLAUSE": {
                                    isValid = true;
                                    break loop;
                                }
                                case "META_CLAUSE": {
                                    isValid = true;
                                    break loop;
                                }
                                case "PROP_CLAUSE": {
                                    isValid = true;
                                    break loop;
                                }
                            }
                        } else {
                            if (TokenTypes[type].validator.test(token as string)) {
                                isValid = true;
                                break;
                            }
                        }
                    }

                    if (optional) return;

                    if (isValid) return;

                    throw new Error(`Type mismatch. Value '${name}' was given the wrong type.`);
                }
            });
        }
    });

    return tokens;
}
