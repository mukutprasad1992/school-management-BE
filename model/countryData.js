var mongoose = require("mongoose");

countrySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("countries", countrySchema);
