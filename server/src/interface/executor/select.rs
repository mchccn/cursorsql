use crate::common::opcode::OpCode::*;
use std::iter::Iterator;

use super::Executor;

impl<I> Executor<I>
where
    I: Iterator<Item = u8>,
{
    pub(super) fn exec_select(&mut self) -> Result<(), ()> {
        self.expect_opcode(OpIdentifier)?;

        // read identifier

        Ok(())
    }
}
