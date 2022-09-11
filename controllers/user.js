const User = require("../model/userData");

exports.getUsers = (req, res, next) => {
  User.find()
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

exports.getUserById = (req, res, next) => {
  User.find()
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
