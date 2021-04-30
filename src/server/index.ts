import { createServer } from "http";
import { normalize } from "path";
import { CQLServer } from "../types";

export default async function init(options?: CQLServer.InitOptions) {
    if (typeof options?.endpoint === "string" && !/\/[a-zA-Z/-]/.test(options.endpoint)) throw new Error("Invalid server endpoint.");

    const endpoint = options?.endpoint?.toLowerCase() ?? "/cql";

    const server = createServer((req, res) => {
        const url = normalize(req.url ?? "");

        if (req.method?.toLowerCase() === "post" && url.toLowerCase().startsWith(endpoint)) {
            req.on("data", (data: Buffer) => {
                const query = data.toString(options?.encoding);

                console.log(query);

                res.writeHead(405);
                res.end();
            });
        }
    });

    return server;
}
