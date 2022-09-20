require("../constant/common");
const { body } = require("express-validator");
var express = require("express");
var router = express.Router();
var registerController = require("../controllers/auth/register");
var loginController = require("../controllers/auth/login");
var userController = require("../controllers/user");
var multerFileUpload = require("../utils/multer");

/**
 * @author Aman
 * @description login
 * @date 13-09-2022
 */
router.post("/login", loginController.loginUser);

/**
 * @author Aman
 * @description Updating data by id
 * @date 09-09-2022
 */
router.put("/:userId", userController.updatedData);

/**
 * @author Aman
 * @description Deleting data by id
 * @date 09-09-2022
 */
router.delete("/:userId", userController.deleteUserById);

/**
 * @author Aman
 * @description Getting data by id
 * @date 09-09-2022
 */
router.get("/:userId", userController.getUserById);

/**
 * @author Aman
 * @description Getting all registerd users data
 * @date 09-09-2022
 */
router.get("/", userController.getUsers);

/**
 * @author Aman
 * @description Creating users & validation
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
  body("roleId").isLength({ min: 1 }).withMessage("Role id must not be empty"),
  registerController.createUser
);

/**
 * @author Aman
 * @description Uploading profile pic & add validation
 * @date 10-09-2022
 */
router.post(
  "/profile-pic-upload",
  multerFileUpload.upload.single("profilePic"),
  userController.profilePicUpload
);

module.exports = router;
