var mongoose = require("mongoose");

classSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    name: { type: String, required: true },
    school: { type: mongoose.Schema.ObjectId, ref: "schools", required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    status: {
      type: String,
      enum: ["INITIATED", "INPROGRESS", "ACTIVATED"],
      default: "INITIATED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("classes", classSchema);
