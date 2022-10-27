require("dotenv").config();

const products = require("../data/products.json");
const log =
    require("../config/config")[process.env.NODE_ENV || "develoment"].log();

async function getProducts(req, res, next) {
    res.json(products);
    log.info("Products sent");
}

async function getByID(req, res, next) {
    const id = req.params.id;
    const data = products.filter((p) => p._id === id);
    res.json(data);
}
/* 
async function getAllByName(req, res, next) {
    const id = req.params.id;
    const data = products.filter((p) => p._id === id);
    res.json(data);
} */

async function getByNameOrSectionOrId(req, res, next) {
    const term = req.query.term;

    const data = products.filter(
        (p) =>
        p.section.toString().toLowerCase().includes(term.toLowerCase()) ||
        p.name.toString().toLowerCase().includes(term.toLowerCase())
    );
    console.log(data);
    res.json(data);
    log.info("Filtered out and sent some products");
}

module.exports.getProducts = getProducts;
module.exports.getByID = getByID;
// module.exports.getAllByName = getAllByName;
module.exports.getByNameOrSectionOrId = getByNameOrSectionOrId;