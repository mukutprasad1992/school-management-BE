const ClassTeacher = require("../model/ClassTeacherData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createClassTeacher = async (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  var classesTeachers = new ClassTeacher({
    class: req.body.class,
    teacher: req.body.teacher,
    employeeId: req.body.employeeId,
    createdBy: req.user._doc._id,
    updatedBy: req.user._doc._id,
  });
  return await classesTeachers
    .save()
    .then((createClassTeacher) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: createClassTeacher,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getClassesTeachers = async (req, res, next) => {
  await ClassTeacher.find()
    .populate("class")
    .populate("teacher")
    .populate("employeeId")
    .populate("createdBy")
    .populate("updatedBy")
    .then((classesTeachers) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: classesTeachers,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getClassesTeachersById = async (req, res, next) => {
  await ClassTeacher.findById(req.params.classTeacherId)
    .populate("class")
    .populate("teacher")
    .populate("employeeId")
    .populate("createdBy")
    .populate("updatedBy")
    .then((getClassTeacher) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getClassTeacher,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updateClassTeacherById = async (req, res, next) => {
  await ClassTeacher.findOneAndUpdate(
    ({ _id: req.params.classTeacherId },
    {
      $set: {
        class: req.body.class,
        teacher: req.body.teacher,
        employeeId: req.body.employeeId,
      },
    })
  )
    .then((classTeacherUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: classTeacherUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteClassesTeachersById = async (req, res, next) => {
  await ClassTeacher.deleteOne({ _id: req.params.classTeacherId })
    .then((classTeacherDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: classTeacherDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
