const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
  accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
});

exports.upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: `${process.env.AWS_BUCKET}`,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `profile_pic_${Date.now().toString()}`);
    },
  }),
});
