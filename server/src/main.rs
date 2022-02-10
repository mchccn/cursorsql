mod backend;
mod common;
mod interface;

use common::opcode::OpCode;
use common::opcode_util::opcode_to_byte;
use dotenv::dotenv;
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};

fn main() -> Result<(), ()> {
    dotenv().ok();

    interface::executor::Executor::new(
        [
            0xf2, 0xa1, 0xa8, 0x00, 0x00, 0x00, 0x05, 0x74, 0x61, 0x62, 0x6c, 0x65, 0xe2, 0xa8,
            0x00, 0x00, 0x00, 0x14, 0xa1, 0xa8, 0x00, 0x00, 0x00, 0x04, 0x63, 0x6f, 0x6c, 0x31,
            0xa1, 0xa8, 0x00, 0x00, 0x00, 0x04, 0x63, 0x6f, 0x6c, 0x32, 0xb3, 0xa8, 0x00, 0x00,
            0x00, 0x12, 0xd4, 0xa1, 0xa8, 0x00, 0x00, 0x00, 0x02, 0x69, 0x64, 0xa5, 0x01, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff,
        ]
        .into_iter(),
    )
    .exec()?;

    let port = common::env::get_or_default("PORT", "42069");

    let listener =
        TcpListener::bind(format!("127.0.0.1:{}", port)).expect("Failed to bind to port");

    for stream in listener.incoming() {
        match stream {
            Ok(mut stream) => {
                let mut buffer = vec![];

                let res = stream.read_to_end(&mut buffer);

                // ! cannot write to stream after read to end

                stream
                    .write(b"hello wordle")
                    .expect("Failed to write to stream");

                println!(
                    "New connection: {}\n{:?}",
                    stream.peer_addr().unwrap(),
                    buffer
                );
            }
            Err(e) => {
                println!("Error: {}", e);
            }
        }
    }

    Ok(())
}
