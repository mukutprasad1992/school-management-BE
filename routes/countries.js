const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const countryController = require("../controllers/country");

/**
 * @author Aman
 * @description Creating country & validation
 * @date 23-09-2022
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("name")
    .isLength({ min: 1 })
    .withMessage("Country name must not be empty"),
  countryController.createCountry
);

/**
 * @author Aman
 * @description Getting all countries
 * @date 23-09-2022
 */
router.get("/", countryController.getcountries);

/**
 * @author Aman
 * @description Getting country by id
 * @date 23-09-2022
 */
router.get("/:countryId", countryController.getcountryById);

/**
 * @author Aman
 * @description Updating country by id
 * @date 23-09-2022
 */
router.put(
  "/:countryId",
  body("name")
    .isLength({ min: 1 })
    .withMessage("Country name must not be empty"),
  countryController.updateCountry
);

/**
 * @author Aman
 * @description Deleting country by id
 * @date 23-09-2022
 */
router.delete("/:countryId", countryController.deleteCountryById);

module.exports = router;
