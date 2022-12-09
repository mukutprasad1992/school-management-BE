const Period = require("../model/periodData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createPeriod = async (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  var periods = new Period({
    period: req.body.period,
    class: req.body.class,
    teacher: req.body.teacher,
    subject: req.body.subject,
    createdBy: req.user._doc._id,
    updatedBy: req.user._doc._id,
  });
  return await periods
    .save()
    .then((createPeriod) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: createPeriod,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getPeriods = async (req, res, next) => {
  await Period.find()
    .populate("class")
    .populate("subject")
    .populate("teacher")
    .populate("createdBy")
    .populate("updatedBy")
    .then((periods) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: periods,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getPeriodById = async (req, res, next) => {
  await Period.findById(req.params.periodId)
    .populate("class")
    .populate("subject")
    .populate("teacher")
    .populate("createdBy")
    .populate("updatedBy")
    .then((getperiod) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getperiod,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updatePeriod = async (req, res, next) => {
  await Period.findOneAndUpdate(
    ({ __id: req.params.periodId },
    {
      $set: {
        period: req.body.period,
        class: req.body.class,
        subject: req.body.subject,
        teacher: req.body.teacher,
      },
    })
  )
    .then((periodUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: periodUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deletePeriodById = async (req, res, next) => {
  await Period.deleteOne({ __id: req.params.periodId })
    .then((periodDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: periodDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
