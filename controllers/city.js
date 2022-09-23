const City = require("../model/cityData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createCity = (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  var city = new City({
    cityName: req.body.cityName,
    stateId: req.body.stateId,
    countryId: req.body.countryId,
  });
  return city
    .save()
    .then((createCity) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: createCity,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getCities = (req, res, next) => {
  City.find()
    .populate("countryId")
    .populate("stateId")
    .then((cities) => {
      console.info("cities", cities);
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: cities,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getCityById = (req, res, next) => {
  City.findById(req.params.cityId)
    .populate("countryId")
    .populate("stateId")
    .then((getCity) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getCity,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updateCity = (req, res, next) => {
  City.findOneAndUpdate(
    ({ __id: req.params.stateId },
    {
      $set: {
        cityName: req.body.cityName,
        stateId: req.body.stateId,
        countryId: req.body.countryId,
      },
    })
  )
    .then((cityUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: cityUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteCityById = (req, res, next) => {
  City.deleteOne({ __id: req.params.cityId })
    .then((cityDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: cityDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
