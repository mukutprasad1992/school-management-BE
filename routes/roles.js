const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role");
const middleware = require("../middleware/auth");

/**
 * @author Aman
 * @description Creating roles & validation
 * @date 10-09-2022
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("name").isLength({ min: 1 }).withMessage("Role name must not be empty"),
  roleController.createRole
);

/**
 * @author Aman
 * @description Updating role by id
 * @date 09-09-2022
 */
router.put(
  "/:roleId",
  middleware.authMiddleware,
  body("name").isLength({ min: 1 }).withMessage("Role name must not be empty"),
  roleController.updateRole
);

/**
 * @author Aman
 * @description Deleting role by id
 * @date 09-09-2022
 */
router.delete(
  "/:roleId",
  middleware.authMiddleware,
  roleController.deleteRoleById
);

/**
 * @author Aman
 * @description Getting role by id
 * @date 09-09-2022
 */
router.get("/:roleId", middleware.authMiddleware, roleController.getroleById);

/**
 * @author Aman
 * @description Getting all roles
 * @date 09-09-2022
 */
router.get("/", roleController.getroles);

module.exports = router;
