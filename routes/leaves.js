const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const leaveController = require("../controllers/leaves");

/**
 * @author Aman
 * @description Creating leaves & validation
 * @date 10-01-2023
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("leaveType")
    .isLength({ min: 1 })
    .withMessage("Leave type must not be empty"),
  body("reason").isLength({ min: 1 }).withMessage("reason must not be empty"),
  body("tag").isLength({ min: 1 }).withMessage("tag must not be empty"),
  body("startDate")
    .isLength({ min: 1 })
    .withMessage("Start date must not be empty"),
  body("endDate")
    .isLength({ min: 1 })
    .withMessage("End date must not be empty"),
  leaveController.createLeave
);

/**
 * @author Aman
 * @description Getting all leavs
 * @date 10-01-2023
 */
router.get("/", middleware.authMiddleware, leaveController.getLeaves);

/**
 * @author Aman
 * @description Getting attendance by id
 * @date 10-01-2023
 */
router.get(
  "/:leaveId",
  middleware.authMiddleware,
  leaveController.getLeaveById
);

/**
 * @author Aman
 * @description updating leaves
 * @date 10-01-2023
 */
router.put(
  "/:leaveId",
  middleware.authMiddleware,
  body("leaveType")
    .isLength({ min: 1 })
    .withMessage("Leave type must not be empty"),
  body("reason").isLength({ min: 1 }).withMessage("reason must not be empty"),
  body("tag").isLength({ min: 1 }).withMessage("tag must not be empty"),
  body("startDate")
    .isLength({ min: 1 })
    .withMessage("Start date must not be empty"),
  body("endDate")
    .isLength({ min: 1 })
    .withMessage("End date must not be empty"),
  leaveController.updateLeaveById
);

/**
 * @author Aman
 * @description Deleting leaves by id
 * @date 10-01-2023
 */
router.delete(
  "/:leaveId",
  middleware.authMiddleware,
  leaveController.deleteLeave
);

/**
 * @author Aman
 * @description updating leaves
 * @date 10-01-2023
 */
router.put(
  "/status/:leaveId",
  middleware.authMiddleware,
  body("status").isLength({ min: 1 }).withMessage("Status must not be empty"),
  leaveController.updateStatusById
);

module.exports = router;
