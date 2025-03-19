const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
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
    district: String,
    propertyType: String,
  },
  { timestamps: true }
);

// Remove the unique index constraint
BookingSchema.index({ user: 1, place: 1 }); // No unique constraint here

const Booking = mongoose.model("Booking", BookingSchema); // Use "Booking" instead of "Bookings"

module.exports = Booking;
