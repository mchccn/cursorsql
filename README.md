[![CQL Banner](./banner.png)](https://cursorsdottsx.github.io/cursorsql)

<p align="center"><strong>CursorsQL is a primitive but intuitive database in Rust for beginners.</strong></p>

---

# Introduction

CursorsQL is a small database that is easy to learn and use. It is intended for use by people who are newcomers to database technology and SQL.

By design, CursorsQL are minimal and simple, and limited. Even though there are some conveniences CQL offers, CQL is just a stepping stone to true SQL databases like [MySQL](https://www.mysql.com/), [SQLite](https://www.sqlite.org/index.html), and [PostgresQL](https://www.postgresql.org/),

Unlike the past [slow.db](https://www.npmjs.com/package/@aeroware/slow.db) and [css.db](https://www.npmjs.com/package/@aeroware/css.db), this project is an actual useable and feasible database that is fast and complete for beginners to database technology.

If something's wrong or doesn't work how you feel, you can open an [issue](https://github.com/cursorsdottsx/cql/issues).

**Documentation is available [here](https://cursorsdottsx.github.io/cursorsql).**

# Consumption and usage

CursorsDB and CQL are available in one package named `@cursorsdottsx/cursorsql`, so you can install them with either `npm` or `yarn`, or any other package manager.

NPM:

```
$ npm install @cursorsdottsx/cursorsql
```

Yarn:

```
$ yarn add @cursorsdottsx/cursorsql
```

The package also comes with a CLI you can use by installing the package globally and executing `cql` or using `npx cql`.

Types for TypeScript are included as the project frontend is in TypeScript.

There is some configuration and setup required before you use CQL and the database driver, though.

-   First you'll need to use `cql config` to set up CursorsDB.
-   Next, use `cql` to use the CLI.
-   Create a new database with the CLI.
-   Use the database driver and connect to the database.

Example usage:

```js
import CQLClient from "@cursorsdottsx/cursorsql";

const client = new CQLClient("cql connection string");

await new Promise((resolve, reject) => {
    client.on("ready", () => {
        console.log("Connected to CursorsQL!");

        return resolve();
    });
});
```

## CursorsQL

### Introduction

CQL has 6 different kinds of statements and only supports basic CRUD. They are as follows:

-   `select` Reading from the database
-   `create` Creating a new table
-   `insert` Inserting into a table
-   `upsert` Upserting into a table
-   `update` Updating a table
-   `delete` Deleting from a table

### Types

CQL supports many primitive types and arrays along with nullables.

-   `i8` 8 bit integer
-   `i16` 16 bit integer
-   `i32` 32 bit integer
-   `i64` 64 bit integer
-   `u8` unsigned 8 bit integer
-   `u16` unsigned 16 bit integer
-   `u32` unsigned 32 bit integer
-   `u64` unsigned 64 bit integer
-   `f32` 32 bit IEEE-754 floating point
-   `f64` 64 bit IEEE-754 floating point
-   `bool` boolean
-   `str` string
-   `null` null

Suffixing a type with `?` will make the type nullable.

### Constraints

CQL also has a few column constraints.

The constraints are:

-   `max` can be used to enforce a max value for numbers or max length for strings
-   `min` can be used to enforce a min value for numbers or min length for strings
-   `unique` can be used to enforce a unique column

### Modifiers

In addition to constraints, CQL also supports modifiers after a `select` statement.

Modifiers will modify the output a `select` statement produces.

Currently, all supported modifiers are:

-   `order` will try to order the results as best as it can (1 for ascending and -1 for descending)
-   `sort` will sort the results by a column (1 for ascending and -1 for descending)
-   `limit` will limit the result count to a maximum value

### Syntax

#### create

```ebnf
create =
'create'
    table
'{'
    ( col type ( ( ( 'max' | 'min' ) number ) | 'unique' )* ',' )*
    ( col type ( ( ( 'max' | 'min' ) number ) | 'unique' )* ( ',' )? )
'}'
';' ;
```

#### insert

```ebnf
insert =
'insert'
    table
'{'

    ( '{'
        ( col ( string | number | boolean ) ',' )*
        ( col ( string | number | boolean ) ( ',' )? )
    '}' ',' )*
    ( '{'
        ( col ( string | number | boolean ) ',' )*
        ( col ( string | number | boolean ) ( ',' )? )
    '}' ( ',' )? )
'}'
';' ;
```

#### select

```ebnf
select =
'select'
    ( '*' | '{' ( col ',' )* ( col ( ',' )? ) '}' )
'from'
    table
( 'where' '{'
    ( col ( '=' | '!' | '>' | '>=' | '<' | '<=' ) ( string | number | boolean ) ',' )*
    ( col ( '=' | '!' | '>' | '>=' | '<' | '<=' ) ( string | number | boolean ) ( ',' )? )
'}' )?
( ( 'sort' | 'order' | 'limit' ) number )*
';' ;
```

#### upsert

```ebnf
upsert =
'upsert'
    table
'{'
    ( col ( string | number | boolean ) ',' )*
    ( col ( string | number | boolean ) ( ',' )? )
'}'
'{'
    ( col ( string | number | boolean ) ',' )*
    ( col ( string | number | boolean ) ( ',' )? )
'}'
( 'where' '{'
    ( col ( '=' | '!' | '>' | '>=' | '<' | '<=' ) ( string | number | boolean ) ',' )*
    ( col ( '=' | '!' | '>' | '>=' | '<' | '<=' ) ( string | number | boolean ) ( ',' )? )
'}' )?
';' ;
```

#### update

```ebnf
update =
'update'
    table
'{'
    ( col ( string | number | boolean ) ',' )*
    ( col ( string | number | boolean ) ( ',' )? )
'}'
( 'where' '{'
    ( col ( '=' | '!' | '>' | '>=' | '<' | '<=' ) ( string | number | boolean ) ',' )*
    ( col ( '=' | '!' | '>' | '>=' | '<' | '<=' ) ( string | number | boolean ) ( ',' )? )
'}' )?
';' ;
```

#### delete

```ebnf
delete =
'delete'
    table
(
    ( 'where' '{'
        ( col ( '=' | '!' | '>' | '>=' | '<' | '<=' ) ( string | number | boolean ) ',' )*
        ( col ( '=' | '!' | '>' | '>=' | '<' | '<=' ) ( string | number | boolean ) ( ',' )? )
    '}' )?
    ( ( 'sort' | 'order' | 'limit' ) number )*
)?
';' ;
```

## CursorsML

CursorsML is a really simple markup language with little syntax that CursorsDB uses to store metadata.

In the future, more syntax and semantics will be added to provide more efficient methods of storing data.

The [documentation](https://cursorsdottsx.github.io/cursorsql) has more information on CursorsML.

# Contributing

### Requirements

-   Node.js v16 or newer
-   Rust v1.58 or newer

First, install all dependencies with either NPM or Yarn.

NPM:

```
$ npm install
```

Yarn:

```
$ yarn
```

Next, install dependencies inside the server.

```
$ cd server/
$ cargo build
```

Then, create your changes and commit them.

Finally, open a pull request!
