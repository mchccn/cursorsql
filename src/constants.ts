type AppendAll<A, S extends string> = A extends readonly [infer H, ...infer Tail] ? readonly [`${H & string}${S}`, ...AppendAll<Tail, S>] : [];

export const FILE_EXTENSION = "cql";

export const BASE_TYPES = ["int8", "int16", "int32", "uint8", "uint16", "uint32", "float16", "float32", "double16", "double32", "boolean", "string", "date", "null"] as const;

export const ARRAY_TYPES = (BASE_TYPES.map((type) => `${type}[]`) as unknown) as AppendAll<typeof BASE_TYPES, "[]">;

export const NULLABLE_ARRAY_TYPES = (ARRAY_TYPES.map((array) => `${array}?`) as unknown) as AppendAll<typeof ARRAY_TYPES, "?">;

export const NULLABLE_TYPES = (BASE_TYPES.map((type) => `${type}?`) as unknown) as AppendAll<typeof BASE_TYPES, "?">;

export const NULLABLE_ARRAY_NULLABLE_TYPES = (NULLABLE_TYPES.map((type) => `${type}[]?`) as unknown) as AppendAll<typeof NULLABLE_TYPES, "[]?">;

export const TYPES = [...BASE_TYPES, ...ARRAY_TYPES, ...NULLABLE_ARRAY_TYPES, ...NULLABLE_TYPES, ...NULLABLE_ARRAY_NULLABLE_TYPES] as const;

export const CONSTRAINTS = ["max", "min", "unique", "enum", "match"] as const;

export const MODIFIERS = ["order", "limit", "sort"] as const;

export const KEYWORDS = ["select", "create", "update", "insert", "delete", "upsert", "from", "where"] as const;

export const RESERVED_WORDS = [...KEYWORDS, ...CONSTRAINTS, ...MODIFIERS, ...BASE_TYPES, ...ARRAY_TYPES, ...NULLABLE_ARRAY_TYPES, ...NULLABLE_TYPES, ...NULLABLE_ARRAY_NULLABLE_TYPES] as const;
