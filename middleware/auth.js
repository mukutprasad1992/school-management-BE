const jwt = require("jsonwebtoken");
const messages = require("../constant/messages");
const httpCodes = require("../constant/status");

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, user) => {
      if (err) {
        return res.sendStatus(httpCodes.statusCodes.forbidden);
      }
      req.user = user;
      next();
    });
  } else {
    res.status(httpCodes.statusCodes.passwordDoesNotMatch).json({
      status: false,
      result: messages.errorMessages.unauthorizedUser,
    });
  }
};
