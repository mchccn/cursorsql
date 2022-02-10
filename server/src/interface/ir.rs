pub enum ComparisonType {
    Greater,
    GreaterEqual,
    Lesser,
    LesserEqual,
    Equal,
    NotEqual,
}

pub enum ValueType {
    ValueInt8(i8),
    ValueInt16(i16),
    ValueInt32(i32),
    ValueInt64(i64),
    ValueUInt8(u8),
    ValueUInt16(u16),
    ValueUInt32(u32),
    ValueUInt64(u64),
    ValueFloat32(f32),
    ValueFloat64(f64),
    ValueBoolean(bool),
    ValueString(String),
    ValueNull(),
}

pub struct Filter {
    pub column: String,
    pub comparison: ComparisonType,
    pub value: ValueType,
}
