var mongoose = require("mongoose");

subjectSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    class: { type: mongoose.Schema.ObjectId, ref: "classes", required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subjects", subjectSchema);
