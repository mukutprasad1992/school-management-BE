const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const schoolController = require("../controllers/school");
const multerFileUpload = require("../utils/multer");

/**
 * @author Aman
 * @description Creating school & validation
 * @date 26-09-2022
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("name").isLength({ min: 1 }).withMessage("Name must not be empty"),
  body("email")
    .isEmail()
    .withMessage("Please enter valid email address")
    .isLength({ min: 1 })
    .withMessage("Email must not be empty"),
  body("phoneNumber")
    .isLength({ min: 1 })
    .withMessage("Phone number must not be empty"),
  body("country").isLength({ min: 1 }).withMessage("Country must be required"),
  body("state").isLength({ min: 1 }).withMessage("State must be required"),
  body("city").isLength({ min: 1 }).withMessage("City must be required"),
  body("address").isLength({ min: 1 }).withMessage("address must be required"),
  body("pinCode")
    .isLength({ min: 5, max: 6 })
    .withMessage(
      "Pin code must not be empty. It should be minimum five or six digit"
    ),
  schoolController.createSchool
);

/**
 * @author Aman
 * @description Getting all schools
 * @date 26-09-2022
 */
router.get("/", schoolController.getSchools);

/**
 * @author Aman
 * @description Getting school by id
 * @date 26-09-2022
 */
router.get("/:schoolId", schoolController.getSchoolById);

/**
 * @author Aman
 * @description Updating school by id
 * @date 26-09-2022
 */
router.put(
  "/:schoolId",
  body("name").isLength({ min: 1 }).withMessage("Name must not be empty"),
  schoolController.updateSchool
);

/**
 * @author Aman
 * @description Deleting school by id
 * @date 26-09-2022
 */
router.delete("/:schoolId", schoolController.deleteSchoolById);

/**
 * @author Aman
 * @description school activation
 * @date 27-09-2022
 */
router.put(
  "/school-activation/:schoolId",
  middleware.authMiddleware,
  schoolController.schoolActivation
);

/**
 * @author Aman
 * @description Uploading school logo & add validation
 * @date 18-01-2023
 */
router.post(
  "/school-logo-upload",
  multerFileUpload.upload.single("schoolLogo"),
  middleware.authMiddleware,
  schoolController.schoolLogoUpload
);

/**
 * @author Aman
 * @description Getting school by user Iid
 * @date 23-01-2023
 */
router.get(
  "/getSchoolByUserId/:userId",
  middleware.authMiddleware,
  schoolController.getSchoolByUserId
);

module.exports = router;
