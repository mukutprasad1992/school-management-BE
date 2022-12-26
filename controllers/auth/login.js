const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../model/userData");
const messages = require("../../constant/messages");
const httpCodes = require("../../constant/status");

exports.loginUser = async (req, res, next) => {
  await User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(httpCodes.statusCodes.userNotFound).json({
          status: false,
          result: messages.errorMessages.userNotFound,
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (error, result) => {
          console.log(req.body.password, result);
          if (error) {
            res.status(httpCodes.statusCodes.passwordDoesNotMatch).json({
              status: false,
              result: error,
            });
          } else if (result) {
            if (user.status !== "ACTIVATED") {
              res.status(httpCodes.statusCodes.passwordDoesNotMatch).json({
                status: false,
                result: messages.errorMessages.userNotActivated,
              });
            } else {
              const token = jwt.sign(
                { ...user },
                `${process.env.JWT_SECRET_KEY}`,
                {
                  expiresIn: `${process.env.JWT_EXPIRE_TIME}`,
                }
              );
              res.status(httpCodes.statusCodes.successStatusCode).json({
                status: true,
                userDetails: { token, user },
              });
            }
          } else {
            res.status(httpCodes.statusCodes.passwordDoesNotMatch).json({
              status: false,
              result: messages.errorMessages.wrongPassword,
            });
          }
        });
      }
    })
    .catch((error) => {
      res.status(httpCodes.statusCodes.internalServerErrorCode).json({
        error: error,
      });
    });
};
