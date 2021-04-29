#!/usr/bin/env node

import "colors";
import pkg from "../../package.json";

console.log(`cursors query language (v${pkg.version})`.cyan);

process.stdout.write("> ".blue);

process.stdin.on("data", async (data) => {
    const query = data.toString("utf8").trim();

    if (query) {
        console.log(query);
    }

    return process.stdout.write("> ".blue);
});
