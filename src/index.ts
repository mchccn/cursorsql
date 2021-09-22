type Pattern = {
    regex: RegExp;
    optional?: boolean;
    validate?: (input: string) => string;
    error?: (input: string) => never;
    format?: (input: string) => any;
};

type Output<A> = A extends readonly [infer First, ...infer Rest]
    ? First extends Pattern
        ? First["optional"] extends true
            ? First["format"] extends (input: string) => infer Value
                ? [Value | undefined, ...Output<Rest>]
                : [string | undefined, ...Output<Rest>]
            : First["format"] extends (input: string) => infer Value
            ? [Value, ...Output<Rest>]
            : [string, ...Output<Rest>]
        : []
    : [];

type Validate<A extends readonly Pattern[]> = A["length"] extends Output<A>["length"]
    ? (statement: string) => Output<A>
    : { TypeError: "Please use `as const` with `compose` for correct typings." };

const compose = <A extends readonly Pattern[]>(pattern: A) => {
    pattern.forEach((pattern) => (pattern.regex = new RegExp(`^${pattern.regex.source}`)));

    return ((statement: string) => {
        const matches = [] as (string | undefined)[];

        for (const { regex, optional, validate = () => "", error, format = ($: string) => $ } of pattern) {
            const match = statement.match(regex)?.[0];

            if (match) {
                const mismatch = validate(match);

                if (mismatch) {
                    if (error) return error(match);

                    throw new SyntaxError(mismatch);
                }

                statement = statement.slice(match.length);
            } else if (!optional) {
                if (error) return error(statement);

                throw new SyntaxError();
            }

            matches.push(match ? format(match) : match);
        }

        return matches;
    }) as Validate<A>;
};

const SELECT = compose([
    {
        regex: /select\s+/,
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
] as const);

// const statement = `select { col1; col2; } from table where { id 0; username "bob" } sort col3 1 order 1 limit 1;`;
// const statement = `select { col1; col2; } from table where { id 0; username "bob" };`;
// const statement = `select * from table sort col 1 limit 10;`
// const statement = `select { col1; col2; } from table;`;
const statement = `select * from table;`;

const tokens = SELECT(statement);

console.log(tokens);
