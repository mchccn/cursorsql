use crate::common::opcode::OpCode::*;
use crate::interface::ir::ComparisonType::*;
use crate::interface::ir::Filter;
use crate::interface::ir::ValueType::*;
use std::iter::Iterator;

use super::Executor;

#[derive(Debug)]
pub enum SelectTarget {
    All,
    Few(Vec<String>),
}

impl<I> Executor<I>
where
    I: Iterator<Item = u8>,
{
    pub(super) fn exec_select(&mut self) -> Result<(), ()> {
        let table = self.read_identifier()?;

        let target = self.expect_opcodes(&[OpStar, OpListClause])?;

        let target = match target {
            OpStar => SelectTarget::All,
            OpListClause => {
                let clauselen = self.read_uint32()?;

                let i = self.index;

                let mut cols = vec![];

                while self.index < i + clauselen as usize {
                    cols.push(self.read_identifier()?);
                }

                SelectTarget::Few(cols)
            }
            _ => panic!(
                "Unexpected opcode, received {:?} instead of OpStar or OpListClause",
                target
            ),
        };

        // parse filters

        if let Some(_) = self.expect_opcode_opt(OpWhere)? {
            let filterlen = self.read_uint32()?;

            let i = self.index;

            let mut filters = vec![];

            while self.index < i + filterlen as usize {
                let comparison = match self.expect_opcodes(&[
                    OpGreater,
                    OpGreaterEqual,
                    OpLesser,
                    OpLesserEqual,
                    OpEqual,
                    OpNotEqual,
                ])? {
                    OpGreater => Greater,
                    OpGreaterEqual => GreaterEqual,
                    OpLesser => Lesser,
                    OpLesserEqual => LesserEqual,
                    OpEqual => Equal,
                    OpNotEqual => NotEqual,
                    _ => panic!("Unexpected opcode received instead of a comparison opcode",),
                };

                let column = self.read_identifier()?;

                let value = match self.peek_opcodes(&[
                    OpInt8, OpInt16, OpInt32, OpInt64, OpUInt8, OpUInt16, OpUInt32, OpUInt64,
                    OpFloat32, OpFloat64, OpBoolean, OpString, OpNull,
                ])? {
                    OpInt8 => ValueInt8(self.read_int8()?),
                    OpInt16 => ValueInt16(self.read_int16()?),
                    OpInt32 => ValueInt32(self.read_int32()?),
                    OpInt64 => ValueInt64(self.read_int64()?),
                    OpUInt8 => ValueUInt8(self.read_uint8()?),
                    OpUInt16 => ValueUInt16(self.read_uint16()?),
                    OpUInt32 => ValueUInt32(self.read_uint32()?),
                    OpUInt64 => ValueUInt64(self.read_uint64()?),
                    OpFloat32 => ValueFloat32(self.read_float32()?),
                    OpFloat64 => ValueFloat64(self.read_float64()?),
                    OpBoolean => ValueBoolean(self.read_boolean()?),
                    OpString => ValueString(self.read_string()?),
                    OpNull => ValueNull(),
                    _ => panic!("Unexpected opcode received instead of a value opcode"),
                };

                filters.push(Filter {
                    column,
                    comparison,
                    value,
                });
            }
        }

        // parse modifiers

        Ok(())
    }
}
