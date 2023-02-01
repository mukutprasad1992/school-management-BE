var mongoose = require("mongoose");

classTeacherSchema = mongoose.Schema(
  {
    class: { type: mongoose.Schema.ObjectId, ref: "classes", required: true },
    teacher: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    employeeId: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("classes-teachers", classTeacherSchema);
