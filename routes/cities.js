const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const cityController = require("../controllers/city");

/**
 * @author Aman
 * @description Creating country & validation
 * @date 10-09-2022
 */
router.post(
  "/",
  middleware.authMiddleware,
  body("cityName")
    .isLength({ min: 1 })
    .withMessage("City name must not be empty"),
  cityController.createCity
);

/**
 * @author Aman
 * @description Getting all cities
 * @date 09-09-2022
 */
router.get("/", cityController.getCities);

/**
 * @author Aman
 * @description Getting cities by id
 * @date 09-09-2022
 */
router.get("/:cityId", cityController.getCityById);

/**
 * @author Aman
 * @description Updating state by id
 * @date 09-09-2022
 */
router.put(
  "/:cityId",
  body("cityName")
    .isLength({ min: 1 })
    .withMessage("City name must not be empty"),
  cityController.updateCity
);

/**
 * @author Aman
 * @description Deleting state by id
 * @date 09-09-2022
 */
router.delete("/:cityId", cityController.deleteCityById);
module.exports = router;
