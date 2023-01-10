var mongoose = require("mongoose");

leaveSchema = mongoose.Schema(
  {
    leaveType: {
      type: String,
      enum: ["SICK", "EMERGENCY", "MEDICAL", "NORMAL", "PLANNED"],
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    reason: { type: String, required: true },
    tag: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("leaves", leaveSchema);
