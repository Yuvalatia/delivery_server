const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/orders.controllers");

router.get("/", ordersController.getAllOrders); // auth middleware + admin middleware
router.put("/", ordersController.createNewOrder); // auth middleware
router.post("/:orderId/set-status", ordersController.changeOrderStatus) // auth middleware - admin middleware


module.exports = router;

