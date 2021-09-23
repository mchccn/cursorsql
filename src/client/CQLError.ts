export class CQLError extends Error {
    public readonly name = "CQLError";

    constructor(
        public readonly code: number,
        public readonly type: "TYPE" | "SYNTAX" | "REFERENCE" | "RANGE" | "AGGREGATE" | "INTERNAL" | "EXTERNAL",
        message?: string
    ) {
        super(message);
    }
}
