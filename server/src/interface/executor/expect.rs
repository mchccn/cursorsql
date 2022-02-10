use crate::common::opcode::OpCode;
use crate::common::opcode_util::byte_to_opcode;
use std::iter::Iterator;

use super::Executor;

impl<I> Executor<I>
where
    I: Iterator<Item = u8>,
{
    pub(super) fn expect_opcode(&mut self, o: OpCode) -> Result<OpCode, ()> {
        let b = self.bytes.next();

        if b.is_none() {
            return Err(());
        }

        self.index += 1;

        match byte_to_opcode(b.unwrap()) {
            Some(c) if c == o => Ok(c),
            _ => Err(()),
        }
    }

    pub(super) fn expect_opcodes(&mut self, o: &[OpCode]) -> Result<OpCode, ()> {
        let b = self.bytes.next();

        if b.is_none() {
            return Err(());
        }

        self.index += 1;

        match byte_to_opcode(b.unwrap()) {
            Some(c) if o.iter().any(|x| *x == c) => Ok(c),
            _ => Err(()),
        }
    }

    pub(super) fn expect_opcode_opt(&mut self, o: OpCode) -> Result<Option<OpCode>, ()> {
        let b = self.bytes.next();

        if b.is_some() {
            self.index += 1;

            match byte_to_opcode(b.unwrap()) {
                Some(c) if c == o => Ok(Some(c)),
                _ => Err(()),
            }
        } else {
            Ok(None)
        }
    }

    pub(super) fn expect_opcodes_opt(&mut self, o: &[OpCode]) -> Result<Option<OpCode>, ()> {
        let b = self.bytes.next();

        if b.is_some() {
            self.index += 1;

            match byte_to_opcode(b.unwrap()) {
                Some(c) if o.iter().any(|x| *x == c) => Ok(Some(c)),
                _ => Err(()),
            }
        } else {
            Ok(None)
        }
    }

    pub(super) fn expect_byte(&mut self) -> Result<u8, ()> {
        let b = self.bytes.next();

        self.index += 1;

        match b {
            Some(b) => Ok(b),
            _ => Err(()),
        }
    }

    pub(super) fn peek_opcode(&mut self, o: OpCode) -> Result<OpCode, ()> {
        let b = self.bytes.peek();

        if b.is_none() {
            return Err(());
        }

        match byte_to_opcode(*b.unwrap()) {
            Some(c) if c == o => Ok(c),
            _ => Err(()),
        }
    }

    pub(super) fn peek_opcodes(&mut self, o: &[OpCode]) -> Result<OpCode, ()> {
        let b = self.bytes.peek();

        if b.is_none() {
            return Err(());
        }

        match byte_to_opcode(*b.unwrap()) {
            Some(c) if o.iter().any(|x| *x == c) => Ok(c),
            _ => Err(()),
        }
    }

    pub(super) fn peek_opcode_opt(&mut self, o: OpCode) -> Result<Option<OpCode>, ()> {
        let b = self.bytes.peek();

        if b.is_some() {
            match byte_to_opcode(*b.unwrap()) {
                Some(c) if c == o => Ok(Some(c)),
                _ => Err(()),
            }
        } else {
            Ok(None)
        }
    }

    pub(super) fn peek_opcodes_opt(&mut self, o: &[OpCode]) -> Result<Option<OpCode>, ()> {
        let b = self.bytes.peek();

        if b.is_some() {
            match byte_to_opcode(*b.unwrap()) {
                Some(c) if o.iter().any(|x| *x == c) => Ok(Some(c)),
                _ => Err(()),
            }
        } else {
            Ok(None)
        }
    }

    pub(super) fn peek_byte(&mut self) -> Result<u8, ()> {
        let b = self.bytes.peek();

        match b {
            Some(b) => Ok(*b),
            _ => Err(()),
        }
    }
}
