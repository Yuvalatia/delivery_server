const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.controllers");
const tokenValidation = require("../middlewares/auth.middleware");

router.get("/", tokenValidation, productsController.getAllProducts);
router.put("/", tokenValidation, productsController.createNewProduct); // auth + admin

module.exports = router;

