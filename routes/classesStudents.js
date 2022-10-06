const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const classStudentController = require("../controllers/classStudent");

/**
 * @author Aman
 * @description Creating classStudent & validation
 * @date 04-10-2022
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("class").isLength({ min: 1 }).withMessage("Class must not be empty"),
  body("student").isLength({ min: 1 }).withMessage("student must not be empty"),
  body("rollNo").isLength({ min: 1 }).withMessage("Roll number not be empty"),
  classStudentController.createClassStudent
);

/**
 * @author Aman
 * @description Getting all classes-Students
 * @date 04-10-2022
 */
router.get("/", classStudentController.getClassesStudents);

/**
 * @author Aman
 * @description Getting classes-Students by id
 * @date 04-10-2022
 */
router.get("/:classStudentId", classStudentController.getClassesStudentsById);

/**
 * @author Aman
 * @description Updating classStudent by id
 * @date 04-10-2022
 */
router.put(
  "/:classStudentId",
  body("class").isLength({ min: 1 }).withMessage("Class must not be empty"),
  body("student").isLength({ min: 1 }).withMessage("Student must not be empty"),
  body("rollNo")
    .isLength({ min: 1 })
    .withMessage("Roll number must not be empty"),
  classStudentController.updateClassstudentById
);

/**
 * @author Aman
 * @description Deleting class-student by id
 * @date 23-09-2022
 */
router.delete(
  "/:classStudentId",
  classStudentController.deleteClassesStudentsById
);

module.exports = router;
