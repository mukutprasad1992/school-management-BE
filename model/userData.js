var mongoose = require("mongoose");

userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    password: { type: String, required: true },
    roleId: { type: mongoose.Schema.ObjectId, ref: "roles", required: true },
    profilePic: { type: String, required: false },
    status: {
      type: String,
      enum: ["INITIATED", "INPROGRESS", "ACTIVATED"],
      default: "INITIATED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
