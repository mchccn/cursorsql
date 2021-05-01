[![CQL Banner](./banner.png)](https://cursorsdottsx.github.io/cql)

<p align="center"><strong>CQL is a simple and easy to learn query language to interact with CursorsDB, a minimal database.</strong></p>

---

# Introduction

CursorsDB is a small database that is easy to learn and use. It is intended for use by people who are newcomers to database technology and SQL.

By design, CursorsDB and CQL are minimal and simple, and limited. Even though there are some conveniences CQL offers, CursorsDB and CQL are just a stepping stone to true SQL databases like [MySQL](https://www.mysql.com/), [SQLite](https://www.sqlite.org/index.html), and [PostgresQL](https://www.postgresql.org/),

Unlike the past [slow.db](https://www.npmjs.com/package/@aeroware/slow.db) and [css.db](https://www.npmjs.com/package/@aeroware/css.db), this project is an actual useable and feasible database that is fast and complete for beginners to database technology.

If something's wrong or doesn't work how you feel, you can open an [issue](https://github.com/cursorsdottsx/cql/issues).

**Documentation is available [here](https://cursorsdottsx.github.io/cql).**

# Consumption and usage

CursorsDB and CQL are available in one package named `cursorsql`, so you can install them with either `npm` or `yarn`, or any other package manager.

NPM:

```
$ npm install cursorsql
```

Yarn:

```
$ yarn add cursorsql
```

The package also comes with a CLI you can use by installing the package globally and executing `cql` or using `npx cql`.

Types for TypeScript are included as the project is in TypeScript.

There is some configuration and setup required before you use CQL and the database driver, though.

- First you'll need to use `cql config` to set up CursorsDB.
- Next, use `cql` to use the CLI.
- Create a new database with the CLI.
- Use the database driver and connect to the database.

Example usage:

```js
const CQLClient = require("cursorsql");

(async () => {
  const client = new CQLClient("cql connection string");
  
  await new Promise((resolve, reject) => {
    client.on("ready", () => {
      console.log("Connected to CursorsDB!");
      
      return resolve();
    });
  });

  // Use `client` to execute queries
})();
```

# Specifications

## CQL

### Introduction

CQL has 6 different kinds of statements and only supports basic CRUD. They are as follows:

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

### Types

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

### Syntax

## CursorsDB
