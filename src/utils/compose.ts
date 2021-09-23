type Pattern = {
    regex: RegExp;
    optional?: boolean;
    exclude?: boolean;
    validate?: (input: string) => string;
    error?: (input: string) => never;
    format?: (input: string) => any;
};

type OutputIncludeAll<A> = A extends readonly [infer First, ...infer Rest]
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

type Output<A> = A extends readonly [infer First, ...infer Rest]
    ? First extends Pattern
        ? First["exclude"] extends true
            ? Output<Rest>
            : First["optional"] extends true
            ? First["format"] extends (input: string) => infer Value
                ? [Value | undefined, ...Output<Rest>]
                : [string | undefined, ...Output<Rest>]
            : First["format"] extends (input: string) => infer Value
            ? [Value, ...Output<Rest>]
            : [string, ...Output<Rest>]
        : []
    : [];

type Validate<A extends readonly Pattern[]> = A["length"] extends OutputIncludeAll<A>["length"]
    ? (statement: string) => Output<A>
    : { TypeError: "Please use `as const` with `compose` for correct typings." };

export const compose = <A extends readonly Pattern[]>(pattern: A) => {
    pattern.forEach((pattern) => (pattern.regex = new RegExp(`^${pattern.regex.source}`)));

    return ((statement: string) => {
        statement = statement.trim();

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
