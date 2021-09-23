import { grammer } from "./constants/grammar";

// const statement = `select { col1; col2; } from table where { id 0; username "bob" } sort col3 1 order 1 limit 1;`;
// const statement = `select { col1; col2; } from table where { id 0; username "bob" };`;
// const statement = `select * from table sort col 1 limit 10;`
// const statement = `select { col1; col2; } from table;`;
const statement = `selec * from table;`;

const tokens = grammer.select(statement);

console.log(tokens);
