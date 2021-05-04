import tokenize from "./tokenize";
import validate from "./validate";

function query(strings: string | TemplateStringsArray, ...values: unknown[]) {
    const query = typeof strings === "string" ? strings : strings.reduce((q, str, i) => `${q}${str}${values[i] ?? ""}`, "");

    const tokens = tokenize(query);

    validate(tokens); // ! BROKEN FIX SOON

    console.log(tokens);
}

query`select * from table where { 
    id "cursors";
    name "scursos ";
};
select * from table2;`;
