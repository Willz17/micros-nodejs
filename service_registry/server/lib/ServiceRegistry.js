const smever = require("semver");
const service = require("../service");

class ServiceRegistry {
    constructor(log) {
        this.log = log;
        this.services = {}; // all services object list
        this.timeout = 3000; // remove service after being inactive for 30 secs
    }

    get(name, version) {
        this.cleanup();
        const servList = Object.values(this.services).filter(
            (service) =>
            service.name == name && smever.satisfies(service.version, version)
        );

        // simulation
        return servList[Math.floor(Math.random() * servList.length)];
    }

    getall() {
        this.log.info(`Sent all active services`);
        return this.services;
    }

    register(name, version, ip, port) {
        this.cleanup();
        const key = `${name}:${version}:${ip}:${port}`;

        if (!this.services[key]) {
            this.services[key] = {};
            this.services[key].timestamp = Math.floor(new Date() / 1000);
            this.services[key].ip = ip;
            this.services[key].port = port;
            this.services[key].name = name;
            this.services[key].version = version;
            this.log.debug(
                `Added service ${name}, version ${version} at ${ip}:${port}`
            );
            return key;
        }

        this.services[key].timestamp = Math.floor(new Date() / 1000);
        this.log.debug(
            `Updated service ${name}, version ${version} at ${ip}:${port}`
        );
        return key;
    }

    unregister(name, version, ip, port) {
        const key = `${name}:${version}:${ip}:${port}`;
        delete this.services[key];
        this.log.debug(
            `Unregistered service ${name}, version: ${version} @ ${ip}:${port}`
        );
        return key;
    }

    cleanup() {
        const now = Math.floor(new Date() / 1000);
        Object.keys(this.services).forEach((key) => {
            if (this.services[key].timestamp + this.timeout < now) {
                delete this.services[key];
                this.log.debug(`Removed service ${key}`);
            }
        });
    }
}

module.exports = ServiceRegistry;