require("../constant/common");
const { body } = require("express-validator");
var express = require("express");
var router = express.Router();
var registerController = require("../controllers/auth/register");
var userController = require("../controllers/user");

/**
 * @author Aman
 * @description TO DO
 * @date 09-09-2022
 */
router.get("/:userId", userController.getUserById);

/**
 * @author Aman
 * @description TO DO
 * @date 09-09-2022
 */
router.get("/", userController.getUsers);

/**
 * @author Aman
 * @description TO DO
 * @date 10-09-2022
 */
router.post(
  "/",
  body("firstName")
    .isLength({ min: 1 })
    .withMessage("Firstname must not be empty"),
  body("lastName")
    .isLength({ min: 1 })
    .withMessage("Lastname must not be empty"),
  body("email")
    .isEmail()
    .isLength({ min: 1 })
    .withMessage("Email must not be empty"),
  body("mobileNumber")
    .isLength({ min: 1 })
    .withMessage("Mobile number must not be empty"),
  body("password")
    .isLength({ min: 1 })
    .withMessage("Password must not be empty"),
  registerController.createUser
);

module.exports = router;
