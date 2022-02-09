use crate::common::opcode::OpCode::*;
use std::iter::Iterator;

use super::Executor;

impl<I> Executor<I>
where
    I: Iterator<Item = u8>,
{
    pub(super) fn read_identifier(&mut self) -> Result<String, ()> {
        self.expect_opcode(OpIdentifier)?;

        let identlen = self.read_uint32()?;

        let mut ident = vec![];

        for _ in 0..identlen {
            ident.push(self.expect_byte()?);
        }

        Ok(String::from_utf8(ident).map_err(|x| ())?)
    }
}
