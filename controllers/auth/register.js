var bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
var User = require("../../model/userData");

exports.createUser = (req, res, next) => {
  // Validate request {params | query | body}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, result: errors.array() });
  }
  // End validation
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (error) {
      return res.status(500).json({
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
      });
      return user
        .save()
        .then((createUser) => {
          res.status(200).json({
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
};
