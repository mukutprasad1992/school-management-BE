const Class = require("../model/classData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createClass = (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  var classes = new Class({
    name: req.body.name,
    user: req.user._doc._id,
    school: req.body.school,
    createdBy: req.user._doc._id,
    updatedBy: req.user._doc._id,
  });
  return classes
    .save()
    .then((createClass) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: createClass,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getClasses = (req, res, next) => {
  Class.find()
    .populate("createdBy")
    .populate("updatedBy")
    .then((classes) => {
      console.info("classes", classes);
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: classes,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getClassById = (req, res, next) => {
  Class.findById(req.params.classId)
    .populate("school")
    .populate("user")
    .populate("createdBy")
    .populate("updatedBy")
    .then((getClass) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getClass,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updateClass = (req, res, next) => {
  Class.findOneAndUpdate(
    ({ __id: req.params.classId },
    {
      $set: {
        name: req.body.name,
      },
    })
  )
    .then((classUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: classUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteClassById = (req, res, next) => {
  Class.deleteOne({ __id: req.params.classId })
    .then((classDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: classDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
