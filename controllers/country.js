const Country = require("../model/countryData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createCountry = (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  var country = new Country({
    countryName: req.body.countryName,
    // countryId: req.body.countryId,
  });
  return country
    .save()
    .then((createCountry) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: createCountry,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getcountries = (req, res, next) => {
  Country.find()
    .then((countries) => {
      console.info("countries", countries);
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: countries,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getcountryById = (req, res, next) => {
  Country.findById(req.params.countryId)
    .then((getCountry) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getCountry,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updateCountry = (req, res, next) => {
  Country.findOneAndUpdate(
    ({ __id: req.params.countryId },
    {
      $set: {
        countryName: req.body.countryName,
      },
    })
  )
    .then((countryUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: countryUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteCountryById = (req, res, next) => {
  Country.deleteOne({ __id: req.params.countryId })
    .then((countryDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: countryDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
