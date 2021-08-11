const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controllers");
const tokenValidation = require("../middlewares/auth.middleware");

router.put("/register", usersController.registerNewUser);
router.post("/login", usersController.loginUser);
router.post("/details", tokenValidation, usersController.getUserDetails)

module.exports = router;
