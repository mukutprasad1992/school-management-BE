var mongoose = require("mongoose");

roleSchema = mongoose.Schema(
  {
    roleName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("roles", roleSchema);
