const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.controllers");

router.get("/", productsController.getAllProducts);
router.put("/", productsController.createNewProduct); // auth + admin

module.exports = router;

