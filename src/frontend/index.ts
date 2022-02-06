//! TEMPORARY FOR TESTING

import { debug } from "../debug/frontend";

// debug.compile("select { col } from table;");
// debug.compile("delete table where { id = 1 };");
// debug.compile("update table { id 0, col 2 };");
// debug.parse("create table { id u8 max 0 unique, name str };");
debug.compile("upsert table { id 0 } { id 1 };");
