const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  host: `${process.env.EMAIL_HOST}`,
  port: `${process.env.EMAIL_PORT}`,
  secure: false,
  requireTLS: true,
  service: `${process.env.EMAIL_SERVICE}`,
  auth: {
    user: `${process.env.EMAIL_USER}`,
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
});

exports.sendEmail = async (mailDetails) => {
  await mailTransporter.sendMail(mailDetails, (error, emailInfo) => {
    if (error) {
      return {
        status: false,
        result: error,
      };
    } else {
      return {
        status: true,
        result: emailInfo,
      };
    }
  });
};
