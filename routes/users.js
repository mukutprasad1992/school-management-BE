require("../constant/common");
var express = require("express");
var router = express.Router();
var userController = require("../controllers/auth/register");

/* GET users listing. */
router.get("/", userController.getUser);

/**
 * @author Aman
 * @description TO DO
 * @date --
 */
router.post("/", userController.createUser);

module.exports = router;
