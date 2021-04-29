require("colors");

const pkg = require("./package.json");

console.log(`cursors query language (v${pkg.version})`.cyan);

const context = {
    query: "",
    history: [],
};

process.stdout.write("> ");

process.stdin.on("data", async (data) => {
    const query = data.toString("utf8").trim();
    
    console.log(query);

    if (query) {

    }

    process.stdout.write("> ");
});
