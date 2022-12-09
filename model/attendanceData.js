var mongoose = require("mongoose");

attendanceSchema = mongoose.Schema(
  {
    class: { type: mongoose.Schema.ObjectId, ref: "classes", required: true },
    dateOfAttendance: { type: Date },
    students: [
      {
        student: {
          type: mongoose.Schema.ObjectId,
          ref: "users",
          required: true,
        },
        status: { type: String, enum: ["PRESENT", "ABSENT", "NORESPONSE"] },
        rollNo: { type: String, required: true },
      },
    ],
    createdBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("attendances", attendanceSchema);
