import { CQLError } from "../client/CQLError";
import { compose } from "../utils/compose";

export const grammer = {
    select: compose([
        {
            regex: /\s*select\s+/,
            exclude: true,
            error(match) {
                const type = match.split(/\s+/, 1)[0];

                throw new CQLError(400, "SYNTAX", `Invalid statement type: '${type}'\n${match}\n${"^".repeat(type.length)}`);
            },
        },
        {
            regex: /(\*|\{\s*(?:[a-zA-Z0-9_]+\s*;)*\s*(?:[a-zA-Z0-9_]+\s*;?)\s*\})\s+/,
        },
        {
            regex: /from\s+/,
        },
        {
            regex: /([a-zA-Z0-9_]+)\s*/,
        },
        {
            regex: /where\s+(\{\s*(?:[a-zA-Z0-9_]+\s+[^\s;]+\s*;)*\s*(?:[a-zA-Z0-9_]+\s+[^\s;]+\s*;?)\s*\})\s*/,
            optional: true,
        },
        {
            regex: /((?:(?:(?:order\s+(?:-1|1))|(?:sort\s+[a-zA-Z0-9_]+\s+(?:-1|1))|(?:limit\s+[1-9][0-9]*))(?:\s+|(?=;)))+)\s*/,
            optional: true,
        },
        {
            regex: /;$/,
        },
    ] as const),
} as const;
