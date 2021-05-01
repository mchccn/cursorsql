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

<sup>**There are 3 different types of clauses as follows:**</sup>

- <sup>**`LIST_CLAUSE`** follows `{ item; ... }` where `item` is a `NAME`.</sup>
- <sup>**`DATA_CLAUSE`** follows `{ prop value; ... }` where `prop` is a `NAME` and `value` is a `LITERAL`.</sup>
- <sup>**`META_CLAUSE`** follows `{ prop type [constraints]; ... }` where `prop` is a `NAME`, `type` is a `TYPE`, and `constraints` are `CONSTRAINT`'s</sup>

#### select

```
select <STAR | LIST_CLAUSE> from NAME [where DATA_CLAUSE, [CONSTRAINT, ...CONSTRAINT]];
```

#### create

```
create NAME META_CLAUSE;
```

#### insert

```
insert NAME DATA_CLAUSE;
```

#### upsert

```
upsert NAME DATA_CLAUSE DATA_CLAUSE;
```

#### update

```
update NAME DATA_CLAUSE DATA_CLAUSE;
```

#### delete

```
delete <NAME | STAR from NAME [where DATA_CLAUSE]>;
```

## CursorsDB

### Introduction

Unlike SQL, CursorsDB does not store SQL statements in `.cql` files. CQL is only used for CRUD and never appears inside CursorsDB. 
CursorsDB is simply a way to store data efficiently and in a way that is fast and understandable to beginners.

CursorsDB can be even thought of as a file format.

While CursorsDB is a database, it is a simple and limited one at that. It is recommended to only use CursorsDB for small projects, or for a starting point before using SQL databases.

### Format

Upon installation and configuration, CursorsDB will create a few configuration and metadata files to store information about current active databases and a log.

Configuration files and logs will be in a format called CursorsML, of course.

The actual format used by CursorsDB to store raw data is very simple to follow:

```
SCHEMA
ROW
ROW
```

The first line will be the schema, and all subsequent lines will be rows in the database. The schema contains the data to validate each row while the rows are the actual data being stored.

To read more about file formats CursorsDB uses, please visit the [documentation](https://cursorsdottsx.github.io/cql).

### Extensions

CursorsDB is extensible through plugins, and is configurable through said plugins.

Plugins have access to how the underlying database is storing and validating data, and even how the database retrieves data.

That means you can create a plugin to implement a [RAID level](https://en.wikipedia.org/wiki/Standard_RAID_levels) or to add lock files, or to create new types.

If you've created a plugin to do something cool, please open a pull request and add it here!

## CursorsML

CursorsML is a really simple markup language with little syntax that CursorsDB uses to store metadata.

In the future, more syntax and semantics will be added to provide more efficient methods of storing data.

The [documentation](https://cursorsdottsx.github.io/cql) has more information on CursorsML.

