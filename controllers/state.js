const State = require("../model/stateData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createState = (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  var state = new State({
    stateName: req.body.stateName,
    countryId: req.body.countryId,
  });
  return state
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

exports.getstates = (req, res, next) => {
  State.find()
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

exports.getstateById = (req, res, next) => {
  State.findById(req.params.stateId)
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

exports.updateState = (req, res, next) => {
  State.findOneAndUpdate(
    ({ __id: req.params.stateId },
    {
      $set: {
        stateName: req.body.stateName,
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

exports.deleteStateById = (req, res, next) => {
  State.deleteOne({ __id: req.params.stateId })
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
