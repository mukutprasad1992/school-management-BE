var bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
var User = require("../../model/userData");
const jwt = require("jsonwebtoken");
const messages = require("../../constant/messages");
const httpCodes = require("../../constant/status");

exports.createUser = async (req, res, next) => {
  // Validate request {params | query | body}
  const getUserOnEmail = await User.find({ email: req.body.email });
  // console.log(getUserOnEmail);
  if (getUserOnEmail && getUserOnEmail.length) {
    res.status(httpCodes.statusCodes.badRequest).json({
      status: false,
      result: messages.errorMessages.emailAlreadyExists,
    });
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpCodes.statusCodes.badRequest)
        .json({ status: false, result: errors.array() });
    }
    // End validation
    bcrypt.hash(req.body.password, 10, (error, hash) => {
      if (error) {
        return res.status(httpCodes.statusCodes.internalServerErrorCode).json({
          status: false,
          result: error,
        });
      } else {
        var user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          mobileNumber: req.body.mobileNumber,
          password: hash,
          role: req.body.role,
          roleId: req.body.roleId,
        });
        return user
          .save()
          .then((createUser) => {
            res.status(httpCodes.statusCodes.successStatusCode).json({
              status: true,
              result: createUser,
            });
          })
          .catch((error) => {
            res.status(500).json({
              status: false,
              result: error,
            });
          });
      }
    });
  }
};
