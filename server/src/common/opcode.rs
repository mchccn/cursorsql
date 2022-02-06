pub  enum OpCode {
    // Values
    OpStar = 0xa0,
    OpIdentifier = 0xa1,
    OpInt8 = 0xa2,
    OpInt16 = 0xa3,
    OpInt32 = 0xa4,
    OpInt64 = 0xa5,
    OpUInt8 = 0xa6,
    OpUInt16 = 0xa7,
    OpUInt32 = 0xa8,
    OpUInt64 = 0xa9,
    OpFloat32 = 0xaa,
    OpFloat64 = 0xab,
    OpBool = 0xac,
    OpStr = 0xad,
    OpBoolean = 0xae,
    OpString = 0xaf,
    // Nulls
    OpNullable = 0x0e,
    OpNull = 0x0f,
    // Modifiers
    OpSort = 0xb0,
    OpOrder = 0xb1,
    OpLimit = 0xb2,
    OpWhere = 0xb3,
    // Constraints
    OpMax = 0xc0,
    OpMin = 0xc1,
    OpUnique = 0xc2,
    // Comparisons
    OpGreater = 0xd0,
    OpGreaterEqual = 0xd1,
    OpLesser = 0xd2,
    OpLesserEqual = 0xd3,
    OpEqual = 0xd4,
    OpNotEqual = 0xd5,
    // Clauses
    OpMetaClause = 0xe0,
    OpDataClause = 0xe1,
    OpListClause = 0xe2,
    OpAggrClause = 0xe4,
    OpAggrSep = 0xe5,
    // Statements
    OpCreate = 0xf0,
    OpInsert = 0xf1,
    OpSelect = 0xf2,
    OpUpdate = 0xf3,
    OpUpsert = 0xf4,
    OpDelete = 0xf5,
    // Semicolon
    OpReturn = 0xff,
}

