const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const subjectController = require("../controllers/subject");

/**
 * @author Aman
 * @description Creating subject & validation
 * @date 29-09-2022
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("name")
    .isLength({ min: 1 })
    .withMessage("Subject name must be required"),
  body("class").isLength({ min: 1 }).withMessage("Class must not be empty"),
  subjectController.createSubject
);

/**
 * @author Aman
 * @description Getting all subjects
 * @date 29-09-2022
 */
router.get("/", subjectController.getSubjects);

/**
 * @author Aman
 * @description Getting subject by id
 * @date 29-09-2022
 */
router.get("/:subjectId", subjectController.getSubjectById);

/**
 * @author Aman
 * @description Updating subjects by id
 * @date 29-09-2022
 */
router.put(
  "/:subjectId",
  body("name")
    .isLength({ min: 1 })
    .withMessage("Subject name must not be empty"),
  subjectController.updateSubject
);

/**
 * @author Aman
 * @description Deleting subject by id
 * @date 29-09-2022
 */
router.delete("/:subjectId", subjectController.deleteSubjectById);

module.exports = router;
