const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const periodController = require("../controllers/period");

/**
 * @author Aman
 * @description Creating period & validation
 * @date 29-09-2022
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("period").isLength({ min: 1 }).withMessage("Period must be required"),
  body("class").isLength({ min: 1 }).withMessage("Class must not be empty"),
  body("subject").isLength({ min: 1 }).withMessage("Subject must not be empty"),
  body("teacher").isLength({ min: 1 }).withMessage("Teacher must not be empty"),
  periodController.createPeriod
);

/**
 * @author Aman
 * @description Getting all periods
 * @date 29-09-2022
 */
router.get("/", periodController.getPeriods);

/**
 * @author Aman
 * @description Getting period by id
 * @date 29-09-2022
 */
router.get("/:periodId", periodController.getPeriodById);

/**
 * @author Aman
 * @description Updating periods by id
 * @date 29-09-2022
 */
router.put(
  "/:periodId",
  body("period").isLength({ min: 1 }).withMessage("Period must not be empty"),
  body("class").isLength({ min: 1 }).withMessage("class must not be empty"),
  body("subject").isLength({ min: 1 }).withMessage("subject must not be empty"),
  body("teacher").isLength({ min: 1 }).withMessage("Teacher must not be empty"),
  periodController.updatePeriod
);

/**
 * @author Aman
 * @description Deleting period by id
 * @date 29-09-2022
 */
router.delete("/:periodId", periodController.deletePeriodById);

module.exports = router;
