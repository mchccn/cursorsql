use std::error::Error;
use std::fmt::{Display, Formatter, Result};

//? create proper error type later

#[derive(Debug)]
pub struct ExecutorError;

impl Error for ExecutorError {}

impl Display for ExecutorError {
    fn fmt(&self, f: &mut Formatter) -> Result {
        write!(f, "ExecutorError {}", self)
    }
}
