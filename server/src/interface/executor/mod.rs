mod create;
mod delete;
mod expect;
mod insert;
mod read;
mod select;
mod update;
mod upsert;
mod util;

use crate::common::opcode::OpCode::*;
use crate::common::opcode_util::byte_to_opcode;
use std::iter::Iterator;

pub struct Executor<I>
where
    I: Iterator<Item = u8>,
{
    pub(super) bytes: I,
    pub(super) index: usize,
}

impl<I> Executor<I>
where
    I: Iterator<Item = u8>,
{
    fn new(bytes: I) -> Self {
        Executor { bytes, index: 0 }
    }

    pub fn exec(&mut self) -> Result<(), ()> {
        let stmt_type = match self.bytes.next() {
            Some(b) => b,
            None => return Err(()),
        };

        self.index += 1;

        let result = match byte_to_opcode(stmt_type) {
            Some(OpCreate) => self.exec_create(),
            Some(OpInsert) => self.exec_insert(),
            Some(OpSelect) => self.exec_select(),
            Some(OpUpdate) => self.exec_update(),
            Some(OpUpsert) => self.exec_upsert(),
            Some(OpDelete) => self.exec_delete(),
            _ => return Err(()),
        };

        if result.is_err() {
            return result;
        }

        match self.bytes.next() {
            Some(b) if byte_to_opcode(b).is_some() => (),
            _ => return Err(()),
        };

        self.index += 1;

        match self.bytes.next() {
            None => (),
            _ => return Err(()),
        }

        self.index += 1;

        Ok(())
    }
}
