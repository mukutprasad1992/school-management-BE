const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const attendanceController = require("../controllers/attendance");

/**
 * @author Aman
 * @description Creating attendance & validation
 * @date 04-10-2022
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("class").isLength({ min: 1 }).withMessage("Class must not be empty"),
  body("dateOfAttendance")
    .isLength({ min: 1 })
    .withMessage("DateOfAttendance must not be empty"),
  body("students")
    .isLength({ min: 1 })
    .withMessage("Students must not be empty"),
  attendanceController.createAttendance
);

/**
 * @author Aman
 * @description Getting all classes-Students
 * @date 04-10-2022
 */
router.get("/", attendanceController.getAttendance);

/**
 * @author Aman
 * @description Getting attendance by id
 * @date 04-10-2022
 */
router.get("/:attendanceId", attendanceController.getAttendanceById);

/**
 * @author Aman
 * @description Updating attendance by id
 * @date 04-10-2022
 */
router.put(
  "/:attendanceId",
  body("class").isLength({ min: 1 }).withMessage("Class must not be empty"),
  body("dateOfAttendance")
    .isLength({ min: 1 })
    .withMessage("DateOfAttendance must not be empty"),
  body("students")
    .isLength({ min: 1 })
    .withMessage("Students must not be empty"),
  attendanceController.updateAttendanceById
);

/**
 * @author Aman
 * @description Deleting attendance by id
 * @date 23-09-2022
 */
router.delete("/:attendanceId", attendanceController.deleteAttandance);
module.exports = router;
