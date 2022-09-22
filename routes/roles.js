const { body } = require("express-validator");
var express = require("express");
var router = express.Router();
var roleController = require("../controllers/role");

/**
 * @author Aman
 * @description Creating roles & validation
 * @date 10-09-2022
 */
router.post(
  "/",
  body("roleName")
    .isLength({ min: 1 })
    .withMessage("roleName must not be empty"),
  roleController.createRole
);

/**
 * @author Aman
 * @description Updating role by id
 * @date 09-09-2022
 */
router.put(
  "/:roleId",
  body("roleName")
    .isLength({ min: 1 })
    .withMessage("roleName must not be empty"),
  roleController.updateRole
);

/**
 * @author Aman
 * @description Deleting role by id
 * @date 09-09-2022
 */
router.delete("/:roleId", roleController.deleteRoleById);

/**
 * @author Aman
 * @description Getting role by id
 * @date 09-09-2022
 */
router.get("/:roleId", roleController.getroleById);

/**
 * @author Aman
 * @description Getting all roles
 * @date 09-09-2022
 */
router.get("/", roleController.getroles);

module.exports = router;
