const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const Booking = require("./models/Booking");

const Place = require("./models/Place.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "hjgvfhfjknvdfbfdfthb";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      // User not found, return early to avoid further execution
      return res.status(404).json({ message: "User not found" });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            // If there's an error, return a 500 response
            return res.status(500).json({ message: "JWT error", error: err });
          }
          // If no error, send the token and user info
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      // Invalid password, return early to avoid further execution
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    // Handle server errors
    return res.status(500).json({ message: "Server error", error: e.message });
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        // Handle error if token verification fails
        return res.status(401).json({ message: "Unauthorized" });
      }
      try {
        const { name, email, _id } = await User.findById(userData.id);
        if (!{ name, email, _id }) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ name, email, _id });
      } catch (error) {
        // Handle errors that occur during database operations
        res.status(500).json({ message: "Server error", error: error.message });
      }
    });
  } else {
    // No token, respond with null or handle as needed
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads" });
const path = require("path");
const BookingModel = require("./models/Booking");

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];
    const { path: filePath, originalname } = file;
    const extension = path.extname(originalname);
    const newPath = filePath + extension;

    fs.renameSync(filePath, newPath);

    // Ensure consistent path formatting
    const relativePath = path.relative(
      path.join(__dirname, "uploads"),
      newPath
    );
    uploadedFiles.push(relativePath);
  }

  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies; // Extract token from cookies

  // Verify the JWT token

  // Destructure data from request body
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    mobile,
    mail,

    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" }); // Handle token verification error
    }

    try {
      // Create a new place in the database
      const newPlace = await Place.create({
        owner: userData.id, // Assign the owner as the logged-in user
        title,
        address,
        photos: addedPhotos, // Ensure this maps correctly to your schema
        description,
        perks,
        extraInfo,
        mobile,
        mail,

        price,
      });

      // Respond with the newly created place
      res.json(newPlace);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating place" });
    }
  });
});

app.get("/places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.json(place);
  } catch (error) {
    console.error("Error fetching place:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies; // Extract token from cookies

  // Verify the JWT token

  // Destructure data from request body
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    mobile,
    mail,

    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        mobile,
        mail,

        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.delete("/places/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    res.json({ success: true, message: "Place deleted successfully" });
  } catch (error) {
    console.error("Error deleting place:", error);
    res.status(500).json({ success: false, message: "Error deleting place" });
  }
});

app.get("/index-places", async (req, res) => {
  res.json(await Place.find());
});

// Add a place to favorites
app.post("/bookings", async (req, res) => {
  const { token } = req.cookies;
  const {
    placeId,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    mobile,
    mail,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    try {
      const favorite = await Booking.create({
        user: userData.id,
        place: placeId,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        mobile,
        mail,
        price,
      });

      res.json(favorite);
    } catch (error) {
      res.status(500).json({ message: "Error adding to favorites", error });
    }
  });
});

// Remove a place from favorites
app.delete("/bookings/:placeId", async (req, res) => {
  const { token } = req.cookies;
  const { placeId } = req.params;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    try {
      const booking = await Booking.findOneAndDelete({
        user: userData.id,
        place: placeId,
      });

      if (!booking) {
        return res.status(404).json({ message: "Favorite not found" });
      }

      res.json({ message: "Favorite removed" });
    } catch (error) {
      res.status(500).json({ message: "Error removing favorite", error });
    }
  });
});

// Example endpoint in backend to check if a place is in favorites
app.get("/bookings/:id", (req, res) => {
  const placeId = req.params.id;
  const userId = req.user.id; // Assuming you have a logged-in user with req.user

  // Check if the place is in the user's favorites
  const isFavorite = checkIfFavorite(userId, placeId);
  res.json({ isFavorite });
});

// Get all favorite places for a user
app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    try {
      const favorites = await Booking.find({ user: userData.id }).populate(
        "place"
      );
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Error fetching favorites", error });
    }
  });
});

app.listen(4000);
