var mongoose = require("mongoose");

classStudentSchema = mongoose.Schema(
  {
    class: { type: mongoose.Schema.ObjectId, ref: "classes", required: true },
    student: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("classes-students", classStudentSchema);
