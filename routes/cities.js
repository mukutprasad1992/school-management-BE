const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const cityController = require("../controllers/city");

/**
 * @author Aman
 * @description Creating city & validation
 * @date 23-09-2022
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("name").isLength({ min: 1 }).withMessage("City name must not be empty"),
  cityController.createCity
);

/**
 * @author Aman
 * @description Getting all cities
 * @date 23-09-2022
 */
router.get("/", cityController.getCities);

/**
 * @author Aman
 * @description Getting cities by id
 * @date 23-09-2022
 */
router.get("/:cityId", cityController.getCityById);

/**
 * @author Aman
 * @description Updating city by id
 * @date 23-09-2022
 */
router.put(
  "/:cityId",
  body("name").isLength({ min: 1 }).withMessage("City name must not be empty"),
  cityController.updateCity
);

/**
 * @author Aman
 * @description Deleting city by id
 * @date 23-09-2022
 */
router.delete("/:cityId", cityController.deleteCityById);

module.exports = router;
