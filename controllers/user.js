const { hash } = require("bcrypt");
const User = require("../model/userData");

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      console.info("users", users);
      res.status(200).json({
        status: true,
        result: users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        result: error,
      });
    });
};

exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .populate("roleId")
    .then((getUser) => {
      res.status(200).json({
        status: true,
        result: getUser,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteUserById = (req, res, next) => {
  User.deleteOne({ __id: req.params.userId })
    .then((UserDeleted) => {
      res.status(200).json({
        status: true,
        result: UserDeleted,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        result: error,
      });
    });
};

exports.updatedData = (req, res, next) => {
  User.findOneAndUpdate(
    ({ __id: req.params.userId },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        password: hash,
      },
    })
  )
    .then((DataUpdate) => {
      res.status(200).json({
        status: true,
        result: DataUpdate,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        result: error,
      });
    });
};

exports.profilePicUpload = (req, res, next) => {
  res.json({ status: true, data: req.file });
};
