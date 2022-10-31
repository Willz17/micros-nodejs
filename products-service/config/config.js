const bunyan = require("bunyan");

const pks = require("../package.json");

const { name, version } = pks;

const getLogger = (serviceName, serviceVersion, level) =>
    bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

module.exports = {
    development: {
        name,
        version,
        log: () => getLogger(name, version, "debug"),
    },
    production: {
        name,
        version,
        log: () => getLogger(name, version, "info"),
    },
};