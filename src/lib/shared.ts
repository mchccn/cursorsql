import { CONSTRAINTS, KEYWORDS, RESERVED_WORDS, TYPES } from "../constants";
import { CQLParser } from "../types";

export const TokenTypes = {
    NAME: {
        name: "NAME",
        validator: /^([a-zA-Z_$][0-9a-zA-Z_$]*)$/,
    },
    CLAUSE: {
        name: "CLAUSE",
        validator: /^(\{.*\})$/s,
    },
    KEYWORD: {
        name: "KEYWORD",
        validator: new RegExp(`^(${RESERVED_WORDS.map(escape).join("|")})$`),
    },
    TYPE: {
        name: "TYPE",
        validator: new RegExp(`^(${TYPES.map(escape).join("|")})$`),
    },
    LITERAL: {
        name: "LITERAL",
        validator: /^((?:-?\d*(\.\d+)?)|(?:"([^"]|(?<=\\)")*")|true|false|null|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,
    },
    CONSTRAINT: {
        type: "CONSTRAINT",
        validator: new RegExp(`^(${CONSTRAINTS.map(escape).join("|")})$`),
    },
    STAR: {
        name: "STAR",
        validator: /^\*$/,
    },
    SEMICOLON: {
        name: "SEMICOLON",
        validator: /^;$/,
    },
    NULL: {
        name: "NULL",
        validator: /^null$/,
    },
    BOOLEAN: {
        type: "BOOLEAN",
        validator: /^(true|false)$/,
    },
    NUMBER: {
        type: "NUMBER",
        validator: /^(?:-?\d*(\.\d+)?)$/,
    },
    STRING: {
        name: "STRING",
        validator: /^(?:"([^"]|(?<=\\)")*")$/,
    },
    DATE: {
        name: "DATE",
        validator: /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/,
    },
} as const;

export const SyntaxTree: Record<typeof KEYWORDS[number], CQLParser.SyntaxDescriptor[]> = {
    select: [
        {
            name: "columns",
            types: ["STAR", "CLAUSE"],
        },
        {
            name: "from",
            reference: "from",
        },
        {
            optional: true,
            name: "where",
            reference: "where",
        },
        {
            optional: true,
            name: "order",
            types: ["CONSTRAINT"],
        },
        {
            optional: true,
            name: "sort",
            types: ["CONSTRAINT"],
        },
        {
            optional: true,
            name: "limit",
            types: ["CONSTRAINT"],
        },
        {
            name: "end",
            types: ["SEMICOLON"],
        },
    ],
    create: [
        {
            name: "table",
            types: ["NAME"],
        },
        {
            name: "data",
            types: ["CLAUSE"],
        },
    ],
    update: [
        {
            name: "table",
            types: ["NAME"],
        },
        {
            name: "where",
            types: ["CLAUSE"],
        },
        {
            name: "data",
            types: ["CLAUSE"],
        },
    ],
    insert: [
        {
            name: "table",
            types: ["NAME"],
        },
        {
            name: "data",
            types: ["CLAUSE"],
        },
    ],
    delete: [
        {
            name: "action",
            or: [
                [
                    {
                        name: "table",
                        types: ["NAME"],
                    },
                ],
                [
                    {
                        name: "star",
                        types: ["STAR"],
                    },
                    {
                        name: "from",
                        reference: "from",
                    },
                    {
                        optional: true,
                        name: "where",
                        reference: "where",
                    },
                ],
            ],
        },
    ],
    upsert: [
        {
            name: "table",
            types: ["NAME"],
        },
        {
            name: "where",
            types: ["CLAUSE"],
        },
        {
            name: "data",
            types: ["CLAUSE"],
        },
    ],
    from: [
        {
            name: "table",
            types: ["NAME"],
        },
    ],
    where: [
        {
            name: "clause",
            types: ["CLAUSE"],
        },
    ],
};
