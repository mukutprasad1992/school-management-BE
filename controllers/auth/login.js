const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var User = require("../../model/userData");

exports.loginUser = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          Result: "user not found",
        });
      }
      bcrypt.compare(
        req.body.password,
        user[user.length - 1].password,
        (error, result) => {
          if (error) {
            return res.status(401).json({
              status: false,
              result: error,
            });
          } else {
            const token = jwt.sign(
              {
                ...user[0],
              },
              "SchoolManagementSystem",
              {
                expiresIn: "24h",
              }
            );
            console.log(token);
            res.status(200).json({
              status: true,
              token,
            });
          }
        }
      );
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
