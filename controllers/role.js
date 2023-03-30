const Role = require("../model/roleData");
const { validationResult } = require("express-validator");
const httpCodes = require("../constant/status");

exports.createRole = async (req, res, next) => {
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
    createdBy: req.user._doc._id,
    updatedBy: req.user._doc._id,
  });
  return await role
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

exports.getroles = async (req, res, next) => {
  await Role.find()
    .populate("createdBy")
    .populate("updatedBy")
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

exports.getroleById = async (req, res, next) => {
  await Role.findById(req.params.roleId)
    .populate("createdBy")
    .populate("updatedBy")
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

exports.deleteRoleById = async (req, res, next) => {
  await Role.deleteOne({ _id: req.params.roleId })
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

exports.updateRole = async (req, res, next) => {
  await Role.findOneAndUpdate(
    ({ _id: req.params.roleId },
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
