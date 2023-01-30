var bcrypt = require("bcrypt");
const User = require("../model/userData");
const Role = require("../model/roleData");
const messages = require("../constant/messages");
const httpCodes = require("../constant/status");
const defaultPagination = require("../constant/pagination ");

exports.getUsers = async (req, res, next) => {
  const { roleId } = req.params;
  //add validation
  const getRole = await Role.findOne({ _id: roleId });
  if (!getRole) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: "Please enter valid role ID" });
  }
  //add pagination
  const {
    page = defaultPagination.pagination.page,
    limit = defaultPagination.pagination.limit,
  } = req.query;
  await User.find({ role: roleId })
    .populate("role")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .then((users) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: users,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.getUserById = async (req, res, next) => {
  await User.findById(req.user._doc._id)
    .populate("role")
    .then((getUser) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: getUser,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.deleteUserById = async (req, res, next) => {
  await User.deleteOne({ __id: req.user._doc._id })
    .then((UserDeleted) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: UserDeleted,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.updatedUser = async (req, res, next) => {
  await User.findOneAndUpdate(
    ({ __id: req.user._doc._id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        role: req.body.roleId,
      },
    })
  )
    .then((DataUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: DataUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.profilePicUpload = async (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.user._doc._id },
    {
      $set: {
        profilePic: req.file.key,
      },
    },
    {
      upsert: true,
      new: true,
    }
  )
    .then((profilePicUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: profilePicUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};

exports.resetPassword = async (req, res, next) => {
  const getUser = await User.findOne({ _id: req.user._doc._id });
  bcrypt.compare(
    req.body.currentPassword,
    getUser.password,
    function (error, result) {
      if (error) {
        return { status: false, result: error };
      }
      if (req.body.newPassword === req.body.confirmNewPassword) {
        bcrypt.hash(req.body.newPassword, 10, (error, hash) => {
          if (error) {
            return res
              .status(httpCodes.statusCodes.internalServerErrorCode)
              .json({
                status: false,
                result: error,
              });
          }
          User.findOneAndUpdate(
            ({ __id: req.user._doc._id },
            {
              $set: {
                password: hash,
              },
            })
          )
            .then((userUpdated) => {
              res.status(httpCodes.statusCodes.successStatusCode).json({
                status: true,
                result: userUpdated,
              });
            })
            .catch((error) => {
              res.status(httpCodes.statusCodes.internalServerErrorCode).json({
                status: false,
                result: error,
              });
            });
        });
      } else {
        return {
          status: false,
          result: messages.errorMessages.passwordNotMatch,
        };
      }
    }
  );
};

exports.userActivation = async (req, res, next) => {
  await User.findOneAndUpdate(
    { _id: req.params.userId },
    {
      $set: {
        status: req.body.status,
      },
    },
    { new: true }
  )
    .then((activationUpdate) => {
      res.status(httpCodes.statusCodes.successStatusCode).json({
        status: true,
        result: activationUpdate,
      });
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        status: false,
        result: error,
      });
    });
};
