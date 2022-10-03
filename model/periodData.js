var mongoose = require("mongoose");

periodSchema = mongoose.Schema(
  {
    period: {
      type: String,
      enum: [
        "FIRST",
        "SECOND",
        "THIRD",
        "FOURTH",
        "FIFTH",
        "SIXTH",
        "SEVENTH",
        "EIGHTH",
      ],
      default: null,
      required: true,
    },
    class: { type: mongoose.Schema.ObjectId, ref: "classes", required: true },
    subject: {
      type: mongoose.Schema.ObjectId,
      ref: "subjects",
      required: true,
    },
    teacher: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("periods", periodSchema);
