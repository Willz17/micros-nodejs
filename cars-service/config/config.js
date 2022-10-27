const bunyan = require("bunyan");

const pjs = require("../package.json");

const { name, version } = pjs;

// Set up a logger
const getLogger = (serviceName, serviceVersion, level) =>
    bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

module.exports = {
    development: { name, version, log: () => getLogger(name, version, "debug") },
    production: { name, version, log: () => getLogger(name, version, "info") },
};