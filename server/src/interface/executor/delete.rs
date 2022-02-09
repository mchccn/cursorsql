use std::iter::Iterator;

use super::Executor;

impl<I> Executor<I>
where
    I: Iterator<Item = u8>,
{
    pub(super) fn exec_delete(&mut self) -> Result<(), ()> {
        unimplemented!()
    }
}
