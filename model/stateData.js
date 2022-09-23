var mongoose = require("mongoose");

stateSchema = mongoose.Schema(
  {
    stateName: { type: String, required: true },
    countryId: {
      type: mongoose.Schema.ObjectId,
      ref: "countries",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("states", stateSchema);