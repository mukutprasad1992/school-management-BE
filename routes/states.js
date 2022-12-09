const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const stateController = require("../controllers/state");

/**
 * @author Aman
 * @description Creating states & validation
 * @date 23-09-2022
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("name").isLength({ min: 1 }).withMessage("State name must not be empty"),
  stateController.createState
);

/**
 * @author Aman
 * @description Getting all states
 * @date 23-09-2022
 */
router.get("/", stateController.getstates);

/**
 * @author Aman
 * @description Getting state by id
 * @date 23-09-2022
 */
router.get("/:stateId", stateController.getstateById);

/**
 * @author Aman
 * @description Updating state by id
 * @date 23-09-2022
 */
router.put(
  "/:stateId",
  body("name")
    .isLength({ min: 1 })
    .withMessage("State name must not be empty"),
  stateController.updateState
);

/**
 * @author Aman
 * @description Deleting state by id
 * @date 23-09-2022
 */
router.delete("/:stateId", stateController.deleteStateById);

module.exports = router;
