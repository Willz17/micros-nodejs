const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    getProducts,
    getByID,
    getByNameOrSectionOrId,
} = require("../controller/product-controller");

router.get("/", getProducts);
/**
 * term : name or id
 */
router.get("/filter/", getByNameOrSectionOrId);

router.get("/:id", getByID);

module.exports = router;