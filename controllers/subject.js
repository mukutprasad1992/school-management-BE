const Subject = require("../model/subjectData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createSubject = async (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  var subjects = new Subject({
    name: req.body.name,
    class: req.body.class,
    createdBy: req.user._doc._id,
    updatedBy: req.user._doc._id,
  });
  return await subjects
    .save()
    .then((createSubject) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: createSubject,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getSubjects = async (req, res, next) => {
  await Subject.find()
    .populate("class")
    .populate("createdBy")
    .populate("updatedBy")
    .then((subjects) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: subjects,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getSubjectById = async (req, res, next) => {
  await Subject.findById(req.params.subjectId)
    .populate("class")
    .populate("createdBy")
    .populate("updatedBy")
    .then((getsubject) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getsubject,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updateSubject = async (req, res, next) => {
  await Subject.findOneAndUpdate(
    ({ _id: req.params.subjectId },
    {
      $set: {
        name: req.body.name,
      },
    })
  )
    .then((subjectUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: subjectUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteSubjectById = async (req, res, next) => {
  await Subject.deleteOne({ _id: req.params.subjectId })
    .then((subjectDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: subjectDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
