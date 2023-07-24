const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path")

const s3 = new AWS.S3({
  accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  region: `${process.env.AWS_REGION}`,
});

exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.AWS_BUCKET}`,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `image_${Date.now().toString()}.${path.extname(file.originalname)}`);
    },
  }),
});
