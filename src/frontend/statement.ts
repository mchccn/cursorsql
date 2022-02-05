import { Token } from "./token";

export abstract class Statement {
    public abstract readonly type: "create" | "insert" | "select" | "upsert" | "update" | "delete";
}

export type Constraint = {
    type: Token;
    value: Token[];
};

export type Modifier = {
    type: Token;
    value: Token[];
};

export type Column = {
    col: Token;
    type: Token;
    constraints: Constraint[];
};

export type Filter = {
    col: Token;
    type: Token;
    value: Token;
};

export type Data = {
    col: Token;
    value: Token;
};

export class CreateStatement extends Statement {
    public readonly type = "create";

    public constructor(public readonly table: Token, public readonly schema: Column[]) {
        super();
    }
}

export class InsertStatement extends Statement {
    public readonly type = "insert";

    public constructor(public readonly table: Token, public readonly data: Data[][]) {
        super();
    }
}

export class SelectStatement extends Statement {
    public readonly type = "select";

    public constructor(
        public readonly cols: "*" | Token[],
        public readonly table: Token,
        public readonly filters: Filter[],
        public readonly modifiers: Modifier[]
    ) {
        super();
    }
}

export class UpsertStatement extends Statement {
    public readonly type = "upsert";

    public constructor(
        public readonly table: Token,
        public readonly update: Data[],
        public readonly insert: Data[],
        public readonly filters: Filter[]
    ) {
        super();
    }
}

export class UpdateStatement extends Statement {
    public readonly type = "update";

    public constructor(
        public readonly table: Token,
        public readonly update: Data[],
        public readonly filters: Filter[]
    ) {
        super();
    }
}

export class DeleteStatement extends Statement {
    public readonly type = "delete";

    public constructor(
        public readonly table: Token,
        public readonly filters: Filter[],
        public readonly modifiers: Modifier[]
    ) {
        super();
    }
}
