var mongoose = require("mongoose");

countrySchema = mongoose.Schema(
  {
    countryName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("countries", countrySchema);
