var bcrypt = require("bcrypt");
const User = require("../model/userData");
const Role = require("../model/roleData");
const messages = require("../constant/messages");
const httpCodes = require("../constant/status");
const mailTransporter = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res, next) => {
  const { roleId } = req.params;
  //add validation
  const getRole = await Role.findOne({ _id: roleId });
  if (!getRole) {
    return res
      .status(httpCodes.statusCodes.badRequest)
      .json({ status: false, result: "Please enter valid role ID" });
  }
  await User.find({ role: roleId })
    .populate("role")
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

exports.getResetPasswordLink = async (req, res, next) => {
  const { email } = req.body;
  const getUser = await User.findOne({ email: email });
  if (!getUser) return res.status(400).send({ message: "Email not found" });
  const token = jwt.sign({ ...getUser }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: `${process.env.JWT_EXPIRE_TIME}`,
  });
  const resetPasswordLink = `http://localhost:4200/reset-password?token=${token}`;
  const mailOptions = {
    from: "amanm4345@gmail.com",
    to: email,
    subject: "Reset your password",
    text: `Please click on the following link to reset your password: ${resetPasswordLink}`,
  };
  await mailTransporter.sendEmail(mailOptions);
};

exports.forgotPassword = async (req, res, next) => {
  const { newPassword, confirmNewPassword } = req.body;
  if (newPassword === confirmNewPassword) {
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    const getUpdatedUserPassword = await User.updateOne(
      { _id: req.user._doc._id },
      {
        $set: { password: hashedPassword },
      },
      { new: true }
    );
    res.status(httpCodes.statusCodes.successStatusCode).json({
      status: true,
      result: getUpdatedUserPassword,
    });
  } else {
    throw new Error("New password and confirm new password does not match");
  }
};
