var mongoose = require("mongoose");

schoolSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    country: {
      type: mongoose.Schema.ObjectId,
      ref: "countries",
      required: true,
    },
    state: { type: mongoose.Schema.ObjectId, ref: "states", required: true },
    city: { type: mongoose.Schema.ObjectId, ref: "cities", required: true },
    address: { type: String, required: true },
    pinCode: { type: String, required: true },
    schoolLogo: { type: String },
    status: {
      type: String,
      enum: ["INITIATED", "INPROGRESS", "ACTIVATED"],
      default: "INITIATED",
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schools", schoolSchema);
