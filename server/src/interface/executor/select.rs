use crate::common::opcode::OpCode::*;
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
                // need to test this part

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

        Ok(())
    }
}
