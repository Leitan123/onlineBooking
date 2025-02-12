const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    title: { type: String, required: true },
    address: { type: String, required: true },
    photos: [String], // Array of image URLs
    description: String,
    perks: [String],
    extraInfo: String,
    mobile: String,
    mail: String,
    price: Number,
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Bookings", FavoriteSchema);
module.exports = Favorite;
