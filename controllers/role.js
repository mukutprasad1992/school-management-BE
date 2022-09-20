const Role = require("../model/roleData");
const { validationResult } = require("express-validator");

exports.createRole = (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, result: errors.array() });
  }
  // End validation
  var role = new Role({
    roleName: req.body.roleName,
  });
  return role
    .save()
    .then((createRole) => {
      res.status(200).json({
        status: true,
        result: createRole,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        result: error,
      });
    });
};

exports.getroles = (req, res, next) => {
  Role.find()
    .then((roles) => {
      console.info("roles", roles);
      res.status(200).json({
        status: true,
        result: roles,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        result: error,
      });
    });
};

exports.getroleById = (req, res, next) => {
  Role.findById(req.params.roleId)
    .then((getRole) => {
      res.status(200).json({
        status: true,
        result: getRole,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteRoleById = (req, res, next) => {
  Role.deleteOne({ __id: req.params.roleId })
    .then((roleDeleted) => {
      res.status(200).json({
        status: true,
        result: roleDeleted,
      });
    })
    .catch((error) => {
      res.status(500).json({
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
        roleName: req.body.roleName,
      },
    })
  )
    .then((roleUpdate) => {
      res.status(200).json({
        status: true,
        result: roleUpdate,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        result: error,
      });
    });
};
