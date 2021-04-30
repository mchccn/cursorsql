import init from "../src/server";

(async () => {
    try {
        const server = await init();

        server.listen(3000, () => console.log("Server listening on port 3000!"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
