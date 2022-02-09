use std::iter::Iterator;

use super::Executor;

impl<I> Executor<I>
where
    I: Iterator<Item = u8>,
{
    pub(super) fn exec_insert(&mut self) -> Result<(), ()> {
        unimplemented!()
    }
}
