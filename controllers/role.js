const Role = require("../model/roleData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createRole = (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: errors.array() });
  }
  // End validation
  var role = new Role({
    name: req.body.name,
  });
  return role
    .save()
    .then((createRole) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: createRole,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getroles = (req, res, next) => {
  Role.find()
    .then((roles) => {
      console.info("roles", roles);
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: roles,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getroleById = (req, res, next) => {
  Role.findById(req.params.roleId)
    .then((getRole) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getRole,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteRoleById = (req, res, next) => {
  Role.deleteOne({ __id: req.params.roleId })
    .then((roleDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: roleDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updateRole = (req, res, next) => {
  Role.findOneAndUpdate(
    ({ __id: req.params.roleId },
    {
      $set: {
        name: req.body.name,
      },
    })
  )
    .then((roleUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: roleUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
