require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const router = require("./router/router");
const config =
    require("./config/config")[process.env.NODE_ENV || "development"];

const app = express();
const log = config.log();
const PORT = 4001;
const SERVICE_PORT = process.env.DOCKER_PORT;
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.use("/rtx/home", express.static(path.join(__dirname, "..", "frontend")));

app.use("/rtx/api/products", router);

app.listen(PORT, () => {
    const registerService = () =>
        axios.put(
            `http://localhost:${SERVICE_PORT}/register/${config.name}/${config.version}/${PORT}`
        );
    const unregisterService = () =>
        axios.delete(
            `http://localhost:${SERVICE_PORT}/unregister/${config.name}/${config.version}/${PORT}`
        );

    registerService();

    const interval = setInterval(registerService, 20 * 1000);
    const cleanup = async() => {
        clearInterval(interval);
        await unregisterService();
    };

    process.on("uncaughtException", async() => {
        await cleanup();
        process.exit(0);
    });

    process.on("SIGINT", async() => {
        await cleanup();
        process.exit(0);
    });

    process.on("SIGTERM", async() => {
        await cleanup();
        process.exit(0);
    });

    log.info(`Service running and listening @ http://localhost:${PORT}/rtx/api/`);
    log.info(`www @ http://localhost:${PORT}/rtx/home`);
});