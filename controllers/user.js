var bcrypt = require("bcrypt");
const User = require("../model/userData");
const messages = require("../constant/messages");
const httpCodes = require("../constant/status");

exports.getUsers = (req, res, next) => {
  User.find()
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

exports.getUserById = (req, res, next) => {
  User.findById(req.user._doc._id)
    .populate("roleId")
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

exports.deleteUserById = (req, res, next) => {
  User.deleteOne({ __id: req.user._doc._id })
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

exports.updatedUser = (req, res, next) => {
  User.findOneAndUpdate(
    ({ __id: req.user._doc._id },
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

exports.profilePicUpload = (req, res, next) => {
  User.findOneAndUpdate(
    ({ __id: req.user._doc._id },
    {
      $set: {
        profilePic: req.file.key,
      },
    })
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
        console.info("req.body.newPassword", req.body.newPassword);
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
      console.log(result);
    }
  );
};

exports.userActivation = (req, res, next) => {
  User.findOneAndUpdate(
    { __id: req.params.userId },
    {
      $set: {
        status: "ACTIVATED",
      },
    }
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
