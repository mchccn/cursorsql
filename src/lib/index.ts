import tokenize from "./tokenize";
import validate from "./validate";

function query(strings: string | TemplateStringsArray, ...values: unknown[]) {
    const query = typeof strings === "string" ? strings : strings.reduce((q, str, i) => `${q}${str}${values[i] ?? ""}`, "");

    const tokens = tokenize(query);

    validate(tokens);

    console.log(tokens);
}

query`select * from table where { 
    id 1;
    name cursors;
}
order -1 limit 10; 
select * from table2;`;
