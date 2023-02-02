const Leave = require("../model/leaveData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createLeave = async (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  const leave = new Leave({
    leaveType: req.body.leaveType,
    reason: req.body.reason,
    tag: req.body.tag,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    createdBy: req.user._doc._id,
    updatedBy: req.user._doc._id,
  });
  return await leave
    .save()
    .then((leave) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: leave,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getLeaves = async (req, res, next) => {
  await Leave.find()
    .populate("tag")
    .then((leave) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: leave,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getLeaveById = async (req, res, next) => {
  await Leave.findById(req.params.leaveId)
    .then((getLeave) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getLeave,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updateLeaveById = async (req, res, next) => {
  await Leave.findOneAndUpdate(
    ({ __id: req.params.leaveId },
    {
      $set: {
        leaveType: req.body.leaveType,
        reason: req.body.reason,
        tag: req.body.tag,
        startDate: req.body.startDate,
        startDate: req.body.endDate,
      },
    })
  )
    .then((leaveUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: leaveUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteLeave = async (req, res, next) => {
  await Leave.deleteOne({ __id: req.params.leaveId })
    .then((leaveeDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: leaveeDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
