require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const config = require("./config/config")[process.env.NODE_ENV];
const router = require("./router/router");

const app = express();
const log = config.log();
const PORT = 4002;
const SERVICE_PORT = process.env.DOCKER_PORT;

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

// router
app.use("/rtx/api/cars", router);

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
});