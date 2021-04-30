type AppendAll<A, S extends string> = A extends [infer Head, ...infer Rest] ? [`${Head & string}${S}`, ...AppendAll<Rest, S>] : [];

export const FILE_EXTENSION = "cql";

export const BASE_TYPES = ["int8", "int16", "int32", "uint8", "uint16", "uint32", "float16", "float32", "double16", "double32", "boolean", "string", "date"] as const;

export const ARRAY_TYPES = BASE_TYPES.map((type) => `${type}[]`) as AppendAll<typeof BASE_TYPES, "[]">;

export const NULLABLE_ARRAY_TYPES = ARRAY_TYPES.map((array) => `${array}?`);

export const NULLABLE_TYPES = BASE_TYPES.map((type) => `${type}?`);

export const NULLABLE_ARRAY_NULLABLE_TYPES = NULLABLE_TYPES.map((type) => `${type}[]?`);

export const KEYWORDS = ["select", "create", "update", "insert", "delete", "upsert", "from"] as const;

export const RESERVED_WORDS = [...KEYWORDS, ...BASE_TYPES, ...ARRAY_TYPES, ...NULLABLE_ARRAY_TYPES, ...NULLABLE_TYPES, ...NULLABLE_ARRAY_NULLABLE_TYPES] as const;
