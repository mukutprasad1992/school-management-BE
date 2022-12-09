var mongoose = require("mongoose");

roleSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("roles", roleSchema);
