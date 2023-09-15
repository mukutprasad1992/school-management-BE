const Attendance = require("../model/attendanceData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createAttendance = async (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  const attendance = new Attendance({
    class: req.body.class,
    dateOfAttendance: req.body.dateOfAttendance,
    students: req.body.students,
    rollNo: req.body.rollNo,
    createdBy: req.user._doc._id,
    updatedBy: req.user._doc._id,
  });
  return await attendance
    .save()
    .then((createAttendance) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: createAttendance,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getAttendance = async (req, res, next) => {
  await Attendance.find()
    .populate("class")
    .populate("students.student")
    .populate("createdBy")
    .populate("updatedBy")
    .then((attendance) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: attendance,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getAttendanceById = async (req, res, next) => {
  await Attendance.findById(req.params.attendanceId)
    .populate("class")
    .populate("students.student")
    .populate("createdBy")
    .populate("updatedBy")
    .then((getAttendance) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getAttendance,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updateAttendanceById = async (req, res, next) => {
  await Attendance.findOneAndUpdate(
    ({ _id: req.params.attendanceId },
    {
      $set: {
        class: req.body.class,
        dateOfAttendance: req.body.dateOfAttendance,
        students: req.body.students,
        rollNo: req.body.rollNo,
      },
    })
  )
    .then((attendanceUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: attendanceUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteAttandance = async (req, res, next) => {
  await Attendance.deleteOne({ _id: req.params.attendanceId })
    .then((attendanceDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: attendanceDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getAttendanceByClassAndDate = async (req, res, next) => {
  console.log("req.param",req.params.classId, req.params.date)
 const data =  await Attendance.find({class: req.params.classId, dateOfAttendance: req.params.date})
    .populate("class")
    .populate("students.student")
    .populate("createdBy")
    .populate("updatedBy")
    .then((AttendanceByClassAndDate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: AttendanceByClassAndDate
      });
      console.log("AttendanceByClassAndDate",AttendanceByClassAndDate)
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};