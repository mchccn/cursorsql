mod backend;
mod common;
mod interface;

use dotenv::dotenv;
use std::io::Write;
use std::net::{TcpListener, TcpStream};

fn main() {
    dotenv().ok();

    let port = common::env::get_or_default("PORT", "42069");

    let listener =
        TcpListener::bind(format!("127.0.0.1:{}", port)).expect("Failed to bind to port");

    for stream in listener.incoming() {
        match stream {
            Ok(mut stream) => {
                stream
                    .write(b"hello wordle")
                    .expect("Failed to write to stream");

                println!("New connection: {}", stream.peer_addr().unwrap());
            }
            Err(e) => {
                println!("Error: {}", e);
            }
        }
    }
}
