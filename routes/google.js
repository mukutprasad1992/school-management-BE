require("../constant/status");
const passport = require("passport");
const express = require("express");
const router = express.Router();

router.get("/auth-page", (req, res) => {
  res.send("<button><a href='/google/auth'>Login With Google</a></button>");
});

router.get(
  "/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/callback",
  passport.authenticate("google", {
    successRedirect: "/google/auth/callback/success",
    failureRedirect: "/google/auth/callback/failure",
  })
);

router.get("/auth/callback/success", (req, res) => {
  if (!req.user) {
    res.redirect("/google/auth/callback/failure");
  } else {
    res.status(httpCodes.statusCodes.internalServerErrorCode).json({
      status: true,
      result: req.user,
    });
  }
});

router.get("/auth/callback/failure", (req, res) => {
  res.status(httpCodes.statusCodes.internalServerErrorCode).json({
    status: false,
    result: error,
  });
});

module.exports = router;
