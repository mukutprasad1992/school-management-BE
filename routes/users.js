require("../constant/status");
const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const registerController = require("../controllers/auth/register");
const loginController = require("../controllers/auth/login");
const userController = require("../controllers/user");
const multerFileUpload = require("../utils/multer");
const middleware = require("../middleware/auth");

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
router.put("/", middleware.authMiddleware, userController.updatedUser);

/**
 * @author Aman
 * @description Deleting data by id
 * @date 09-09-2022
 */
router.delete("/", middleware.authMiddleware, userController.deleteUserById);

/**
 * @author Aman
 * @description Getting data by id
 * @date 09-09-2022
 */
router.get("/", middleware.authMiddleware, userController.getUserById);

/**
 * @author Aman
 * @description Getting all registerd users data
 * @date 09-09-2022
 */
router.get("/all-users", middleware.authMiddleware, userController.getUsers);

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
 * @date 19-09-2022
 */
router.post(
  "/profile-pic-upload",
  multerFileUpload.upload.single("profilePic"),
  middleware.authMiddleware,
  userController.profilePicUpload
);

/**
 * @author Aman
 * @description Uploading profile pic & add validation
 * @date 20-09-2022
 */
router.post(
  "/reset-password",
  middleware.authMiddleware,
  userController.resetPassword
);

module.exports = router;
