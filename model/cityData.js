var mongoose = require("mongoose");

citySchema = mongoose.Schema(
  {
    cityName: { type: String, required: true },
    stateId: {
      type: mongoose.Schema.ObjectId,
      ref: "states",
      required: true,
    },
    countryId: {
      type: mongoose.Schema.ObjectId,
      ref: "countries",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cities", citySchema);
