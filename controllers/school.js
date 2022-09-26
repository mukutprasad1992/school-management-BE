const School = require("../model/schoolData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createSchool = (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  var school = new School({
    user: req.user._doc._id,
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    address: req.body.address,
    pinCode: req.body.pinCode,
  });
  return school
    .save()
    .then((createSchool) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: createSchool,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getSchools = (req, res, next) => {
  School.find()
    .then((schools) => {
      console.info("schools", schools);
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: schools,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getSchoolById = (req, res, next) => {
  School.findById(req.params.schoolId)
    .populate("user")
    .populate("city")
    .populate("state")
    .populate("country")

    .then((getSchool) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getSchool,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updateSchool = (req, res, next) => {
  School.findOneAndUpdate(
    ({ __id: req.params.schoolId },
    {
      $set: {
        name: req.body.name,
      },
    })
  )
    .then((schoolUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: schoolUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteSchoolById = (req, res, next) => {
  School.deleteOne({ __id: req.params.schoolId })
    .then((schoolDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: schoolDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
