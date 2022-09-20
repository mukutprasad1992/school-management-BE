const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
  accessKeyId: "AKIA3YIAUSVUBHJMBLFH",
  secretAccessKey: "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",
});

exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "awsphaseonebucket",
    metadata: function (req, file, cb) {
      console.log(file);
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.info("File", file);
      cb(null, Date.now().toString());
    },
  }),
});
