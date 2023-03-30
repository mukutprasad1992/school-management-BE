const ClassStudent = require("../model/classStudentData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");
const messages = require("../constant/messages");
var User = require("../model/userData");

exports.createClassStudent = async (req, res, next) => {
  const getStudent = await User.findOne({
    student: req.body.student,
    class: req.body.class,
  });
  if (getStudent) {
    res.status(httpCodes.statusCodes.badRequest).json({
      status: false,
      result: messages.errorMessages.studentAlreadyAssociate,
    });
  } else {
    // Validate request {params | query | body}
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpCodes.statusCodes.conflictRequest)
        .json({ status: false, result: errors.array() });
    }
    // End validation
    var classesStudents = new ClassStudent({
      class: req.body.class,
      student: req.body.student,
      rollNo: req.body.rollNo,
      createdBy: req.user._doc._id,
      updatedBy: req.user._doc._id,
    });
    return await classesStudents
      .save()
      .then((createClassStudent) => {
        res.status(httpCodes.statusCodes.successStatusCode).json({
          status: true,
          result: createClassStudent,
        });
      })
      .catch((error) => {
        res.status(httpCodes.statusCodes.internalServerErrorCode).json({
          status: false,
          result: error,
        });
      });
  }
};

exports.getClassesStudents = async (req, res, next) => {
  await ClassStudent.find()
    .populate("class")
    .populate("student")
    .populate("rollNo")
    .populate("createdBy")
    .populate("updatedBy")
    .then((classesStudents) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: classesStudents,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getClassesStudentsById = async (req, res, next) => {
  await ClassStudent.findById(req.params.classStudentId)
    .populate("class")
    .populate("student")
    .populate("rollNo")
    .populate("createdBy")
    .populate("updatedBy")
    .then((getClassStudent) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getClassStudent,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updateClassstudentById = async (req, res, next) => {
  await ClassStudent.findOneAndUpdate(
    ({ _id: req.params.classStudentId },
    {
      $set: {
        class: req.body.class,
        student: req.body.student,
      },
    })
  )
    .then((classStudentUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: classStudentUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteClassesStudentsById = async (req, res, next) => {
  await ClassStudent.deleteOne({ _id: req.params.classStudentId })
    .then((classStudentDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: classStudentDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getStudentsByClassId = async (req, res, next) => {
  ClassStudent.find({ class: req.params.classId })
    .populate("student")
    .populate("createdBy")
    .then((getStudent) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getStudent,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
