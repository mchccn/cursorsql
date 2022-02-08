use crate::common::opcode::OpCode::{self, *};

pub fn opcode_to_byte(o: OpCode) -> u8 {
    o as u8
}

pub fn byte_to_opcode(b: u8) -> Option<OpCode> {
    match b {
        0xa0 => Some(OpStar),
        0xa1 => Some(OpIdentifier),
        0xa2 => Some(OpInt8),
        0xa3 => Some(OpInt16),
        0xa4 => Some(OpInt32),
        0xa5 => Some(OpInt64),
        0xa6 => Some(OpUInt8),
        0xa7 => Some(OpUInt16),
        0xa8 => Some(OpUInt32),
        0xa9 => Some(OpUInt64),
        0xaa => Some(OpFloat32),
        0xab => Some(OpFloat64),
        0xac => Some(OpBool),
        0xad => Some(OpStr),
        0xae => Some(OpBoolean),
        0xaf => Some(OpString),
        0x0e => Some(OpNullable),
        0x0f => Some(OpNull),
        0xb0 => Some(OpSort),
        0xb1 => Some(OpOrder),
        0xb2 => Some(OpLimit),
        0xb3 => Some(OpWhere),
        0xc0 => Some(OpMax),
        0xc1 => Some(OpMin),
        0xc2 => Some(OpUnique),
        0xd0 => Some(OpGreater),
        0xd1 => Some(OpGreaterEqual),
        0xd2 => Some(OpLesser),
        0xd3 => Some(OpLesserEqual),
        0xd4 => Some(OpEqual),
        0xd5 => Some(OpNotEqual),
        0xe0 => Some(OpMetaClause),
        0xe1 => Some(OpDataClause),
        0xe2 => Some(OpListClause),
        0xe4 => Some(OpAggrClause),
        0xe5 => Some(OpAggrSep),
        0xf0 => Some(OpCreate),
        0xf1 => Some(OpInsert),
        0xf2 => Some(OpSelect),
        0xf3 => Some(OpUpdate),
        0xf4 => Some(OpUpsert),
        0xf5 => Some(OpDelete),
        0xff => Some(OpReturn),
        _ => None,
    }
}

pub fn byte_to_opcode_strict(b: u8) -> OpCode {
    match byte_to_opcode(b) {
        Some(o) => o,
        None => panic!("Cannot cast byte '{:02x}' to an OpCode", b),
    }
}