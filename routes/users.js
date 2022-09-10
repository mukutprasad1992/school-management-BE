require("../constant/common");
var express = require("express");
var router = express.Router();
var User = require("../model/userData");
var bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.status(200).json("respond with a resource!");
});

/**
 * @author Aman
 * @description TO DO
 * @date --
 */
router.post("/", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        Something_went_worng: err,
      });
    } else {
      var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(200).json({
            new_user: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

module.exports = router;
