const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/orders.controllers");
const tokenValidation = require("../middlewares/auth.middleware");

router.get("/", tokenValidation, ordersController.getAllOrders); // auth middleware + admin middleware
router.put("/", tokenValidation, ordersController.createNewOrder); // auth middleware
router.post("/:orderId/set-status", tokenValidation, ordersController.changeOrderStatus) // auth middleware - admin middleware


module.exports = router;

