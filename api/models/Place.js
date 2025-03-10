const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  mobile: Number,
  mail: String,

  price: Number,

  // New fields
  district: { type: String }, // Add the district field
  propertyType: { type: String }, // Add the propertyType field
});

const PlaceModel = mongoose.model("Place", placeSchema);

module.exports = PlaceModel;
