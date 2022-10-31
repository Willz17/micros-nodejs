const data = require("../data/cars.json");
const config = require("../config/config").development;
const log = config.log();

async function getAllCars(req, res, next) {
  res.json(data);
  log.info("Cars sent");
}

async function getCar(req, res, next) {
  const name = req.params.name;
  const car = data.filter((car) => car.name === name);
  res.json(car);
  log.info(`Car ${name} sent `);
}

module.exports.getAllCars = getAllCars;
module.exports.getCar = getCar;
