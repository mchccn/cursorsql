#!/usr/bin/env node

import "colors";

console.log(`cursors query language (v${process.env.npm_package_version})`.cyan);

process.stdout.write("> ".blue);

process.stdin.on("data", async (data) => {
    const query = data.toString("utf8").trim();

    if (query) {
        console.log(query);
    }

    return process.stdout.write("> ".blue);
});
