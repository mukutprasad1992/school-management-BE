const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const classTeacherController = require("../controllers/classTeacher");

/**
 * @author Aman
 * @description Creating classTeacher & validation
 * @date 01-02-2023
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("class").isLength({ min: 1 }).withMessage("Class must not be empty"),
  body("teacher").isLength({ min: 1 }).withMessage("Teacher must not be empty"),
  body("employeeId")
    .isLength({ min: 1 })
    .withMessage("EmployeeId must not be empty"),
  classTeacherController.createClassTeacher
);

/**
 * @author Aman
 * @description Getting all classes-Teachers
 * @date 01-02-2023
 */
router.get("/", classTeacherController.getClassesTeachers);

/**
 * @author Aman
 * @description Getting classes-Teachers by id
 * @date 04-10-2022
 */
router.get("/:classTeacherId", classTeacherController.getClassesTeachersById);

/**
 * @author Aman
 * @description Updating classTeacher by id
 * @date 01-02-2023
 */
router.put(
  "/:classTeacherId",
  body("class").isLength({ min: 1 }).withMessage("Class must not be empty"),
  body("teacher").isLength({ min: 1 }).withMessage("Teacher must not be empty"),
  body("employeeId")
    .isLength({ min: 1 })
    .withMessage("EmployeeId must not be empty"),
  classTeacherController.updateClassTeacherById
);

/**
 * @author Aman
 * @description Deleting class-Teacher by id
 * @date 01-02-2023
 */
router.delete(
  "/:classTeacherId",
  classTeacherController.deleteClassesTeachersById
);

module.exports = router;
