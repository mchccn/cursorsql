use crate::common::opcode::OpCode::{self, *};
use crate::common::opcode_util::byte_to_opcode;
use std::iter::Iterator;

pub struct Executor<I>
where
    I: Iterator<Item = u8>,
{
    bytes: I,
}

impl<I> Executor<I>
where
    I: Iterator<Item = u8>,
{
    fn new(bytes: I) -> Self {
        Executor { bytes }
    }

    fn expect_opcode(&mut self, o: OpCode) -> Result<OpCode, ()> {
        let b = self.bytes.next();

        if b.is_none() {
            return Err(());
        }

        match byte_to_opcode(b.unwrap()) {
            Some(c) if c == o => Ok(c),
            _ => Err(()),
        }
    }

    fn expect_opcodes(&mut self, o: &[OpCode]) -> Result<OpCode, ()> {
        let b = self.bytes.next();

        if b.is_none() {
            return Err(());
        }

        match byte_to_opcode(b.unwrap()) {
            Some(c) if o.iter().any(|x| *x == c) => Ok(c),
            _ => Err(()),
        }
    }

    fn expect_opcode_opt(&mut self, o: OpCode) -> Result<Option<OpCode>, ()> {
        let b = self.bytes.next();

        if b.is_some() {
            match byte_to_opcode(b.unwrap()) {
                Some(c) if c == o => Ok(Some(c)),
                _ => Err(()),
            }
        } else {
            Ok(None)
        }
    }

    fn expect_opcodes_opt(&mut self, o: &[OpCode]) -> Result<Option<OpCode>, ()> {
        let b = self.bytes.next();

        if b.is_some() {
            match byte_to_opcode(b.unwrap()) {
                Some(c) if o.iter().any(|x| *x == c) => Ok(Some(c)),
                _ => Err(()),
            }
        } else {
            Ok(None)
        }
    }

    fn expect_byte(&mut self, bytes: &mut I) -> Result<u8, ()> {
        let b = self.bytes.next();

        match b {
            Some(b) => Ok(b),
            _ => Err(()),
        }
    }

    fn read_uint32() -> Result<u32, ()> {
        unimplemented!()
    }

    fn exec_create(&mut self) -> Result<(), ()>
    {
        unimplemented!()
    }

    fn exec_insert(&mut self) -> Result<(), ()>
    {
        unimplemented!()
    }

    fn exec_select(&mut self) -> Result<(), ()>
    {
        self.expect_opcode(OpCode::OpIdentifier)?;

        // read identifier

        Ok(())
    }

    fn exec_update(&mut self) -> Result<(), ()>
    {
        unimplemented!()
    }

    fn exec_upsert(&mut self) -> Result<(), ()>
    {
        unimplemented!()
    }

    fn exec_delete(&mut self) -> Result<(), ()>
    {
        unimplemented!()
    }

    fn exec(&mut self) -> Result<(), ()> {
        let stmt_type = match self.bytes.next() {
            Some(b) => b,
            None => return Err(()),
        };
    
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
    
        match self.bytes.next() {
            None => (),
            _ => return Err(()),
        }
    
        Ok(())
    }
}
