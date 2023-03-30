const State = require("../model/stateData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createState = async (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  var state = new State({
    name: req.body.name,
    countryId: req.body.countryId,
  });
  return await state
    .save()
    .then((createState) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: createState,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getstates = async (req, res, next) => {
  await State.find()
    .then((states) => {
      console.info("states", states);
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: states,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getstateById = async (req, res, next) => {
  await State.findById(req.params.stateId)
    .populate("countryId")
    .then((getState) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getState,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updateState = async (req, res, next) => {
  await State.findOneAndUpdate(
    ({ _id: req.params.stateId },
    {
      $set: {
        name: req.body.name,
      },
    })
  )
    .then((stateUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: stateUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteStateById = async (req, res, next) => {
  await State.deleteOne({ _id: req.params.stateId })
    .then((stateDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: stateDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
