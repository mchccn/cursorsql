use crate::common::opcode::OpCode::*;
use std::iter::Iterator;

use super::Executor;

impl<I> Executor<I>
where
    I: Iterator<Item = u8>,
{
    pub(super) fn read_int8(&mut self) -> Result<i8, ()> {
        self.expect_opcode(OpInt8)?;

        let bytes = [self.expect_byte()?];

        Ok(i8::from_be_bytes(bytes))
    }

    pub(super) fn read_int16(&mut self) -> Result<i16, ()> {
        self.expect_opcode(OpInt16)?;

        let bytes = [self.expect_byte()?, self.expect_byte()?];

        Ok(i16::from_be_bytes(bytes))
    }

    pub(super) fn read_int32(&mut self) -> Result<i32, ()> {
        self.expect_opcode(OpInt32)?;

        let bytes = [
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
        ];

        Ok(i32::from_be_bytes(bytes))
    }

    pub(super) fn read_int64(&mut self) -> Result<i64, ()> {
        self.expect_opcode(OpInt64)?;

        let bytes = [
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
        ];

        Ok(i64::from_be_bytes(bytes))
    }

    pub(super) fn read_uint8(&mut self) -> Result<u8, ()> {
        self.expect_opcode(OpUInt8)?;

        let bytes = [self.expect_byte()?];

        Ok(u8::from_be_bytes(bytes))
    }

    pub(super) fn read_uint16(&mut self) -> Result<u16, ()> {
        self.expect_opcode(OpUInt16)?;

        let bytes = [self.expect_byte()?, self.expect_byte()?];

        Ok(u16::from_be_bytes(bytes))
    }

    pub(super) fn read_uint32(&mut self) -> Result<u32, ()> {
        self.expect_opcode(OpUInt32)?;

        let bytes = [
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
        ];

        Ok(u32::from_be_bytes(bytes))
    }

    pub(super) fn read_uint64(&mut self) -> Result<u64, ()> {
        self.expect_opcode(OpUInt64)?;

        let bytes = [
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
        ];

        Ok(u64::from_be_bytes(bytes))
    }

    pub(super) fn read_float32(&mut self) -> Result<f32, ()> {
        self.expect_opcode(OpFloat32)?;

        let bytes = [
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
        ];

        Ok(f32::from_be_bytes(bytes))
    }

    pub(super) fn read_float64(&mut self) -> Result<f64, ()> {
        self.expect_opcode(OpFloat64)?;

        let bytes = [
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
            self.expect_byte()?,
        ];

        Ok(f64::from_be_bytes(bytes))
    }

    pub(super) fn read_boolean(&mut self) -> Result<bool, ()> {
        self.expect_opcode(OpBoolean)?;

        let bytes = [self.expect_byte()?];

        Ok(u8::from_be_bytes(bytes) != 0)
    }

    pub(super) fn read_string(&mut self) -> Result<String, ()> {
        self.expect_opcode(OpString)?;

        let length = self.read_uint32()? as usize;

        let mut bytes = Vec::with_capacity(length);

        for _ in 0..length {
            bytes.push(self.expect_byte()?);
        }

        Ok(String::from_utf8(bytes).map_err(|_| ())?)
    }
}
