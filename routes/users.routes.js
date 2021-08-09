const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controllers");

router.put("/register", usersController.registerNewUser);
router.post("/login", usersController.loginUser);

module.exports = router;
