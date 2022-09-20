const { ObjectId } = require("mongodb");
var mongoose = require("mongoose");
const { ENUM } = require("mysql/lib/protocol/constants/types");

userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    password: { type: String, required: true },
    roleId: { type: mongoose.Schema.ObjectId, ref: "roles", required: true },
    status: {
      type: String,
      enum: ["INITIATED", "INPROGRESS", "ACTIVATED"],
      default: "INITIATED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
