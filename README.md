# cql

**CQL is a simple and easy to learn query language to interact with CursorsDB, a minimal database.**

## Specifications

CQL has 6 different kinds of statements and supports CRUD. They are as follows:

- `select` Reading from the database
- `create` Creating a new table
- `insert` Inserting into a table
- `upsert` Upserting into a table
- `update` Updating a table
- `delete` Deleting from a table

In CQL, there ar 8 types of tokens, and they are:

- `KEYWORD` a special word
- `CLAUSE` a block that holds some organized data
- `NAME` an identifier for something
- `LITERAL` numbers, strings, dates, booleans and null
- `TYPE` a data type
- `STAR` represents everything
- `SEMICOLON` ends a statement
- `CONSTRAINT` query constraints or table column constraints

CQL supports many primitive types and arrays along with nullables.

- `int8` 8 bit integer
- `int16` 16 bit integer
- `int32` 32 bit integer
- `uint8` unsigned 8 bit integer
- `uint16` unsigned 16 bit integer
- `uint32` unsigned 32 bit integer
- `float16` 16 bit floating point number
- `float32` 32 bit floating point number
- `double16` 16 bit double precision floating point number
- `double32` 32 bit double precision floating point number
- `boolean` boolean
- `string` string
- `date` ISO 8601 date
- `null` null

Suffixing a type with `?` will make the type nullable, and suffixing a type with `[]` will make the type an array.

Types can be suffixed with both `?` and `[]`.

- `type` (regular)
- `type?` (nullable)
- `type[]` (as array)
- `type[]?` (as nullable array)
- `type?[]?` (as nullable array of nullables)
