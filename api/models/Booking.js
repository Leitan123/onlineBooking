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

// Ensure the uniqueness of the `user` and `place` pair at the database level
FavoriteSchema.index({ user: 1, place: 1 }, { unique: true });

const Favorite = mongoose.model("Boookings", FavoriteSchema); // Fixed the model name

module.exports = Favorite;
