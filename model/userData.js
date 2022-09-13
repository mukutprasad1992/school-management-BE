var mongoose = require("mongoose");

userSchema = mongoose.Schema({
  __id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: Number,
  password: String,
});

module.exports = mongoose.model("users", userSchema);
