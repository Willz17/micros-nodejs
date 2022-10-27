const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAllCars, getCar } = require("../controller/car-controller");

router.get("/", getAllCars);
router.get("/:name", getCar);

module.exports = router;