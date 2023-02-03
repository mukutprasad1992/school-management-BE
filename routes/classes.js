const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const classController = require("../controllers/class");

/**
 * @author Aman
 * @description Creating class & validation
 * @date 26-09-2022
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("name").isLength({ min: 1 }).withMessage("Class name must not be empty"),
  classController.createClass
);

/**
 * @author Aman
 * @description Getting all classes
 * @date 26-09-2022
 */
router.get("/", classController.getClasses);

/**
 * @author Aman
 * @description Getting classes by id
 * @date 26-09-2022
 */
router.get("/:classId", classController.getClassById);

/**
 * @author Aman
 * @description Updating class by id
 * @date 23-09-2022
 */
router.put(
  "/:classId",
  body("name").isLength({ min: 1 }).withMessage("Class name must not be empty"),
  classController.updateClass
);

/**
 * @author Aman
 * @description Deleting class by id
 * @date 23-09-2022
 */
router.delete("/:classId", classController.deleteClassById);

router.put(
  "/status/:classId",
  body("status").isLength({ min: 1 }).withMessage("Staus must not be empty"),
  classController.updateClassStatus
);
module.exports = router;
