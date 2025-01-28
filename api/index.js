const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
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
    checkIn,
    checkOut,
    maxGuests,
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
        checkIn,
        checkOut,
        maxGuests,
      });

      // Respond with the newly created place
      res.json(newPlace);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating place" });
    }
  });
});

app.listen(4000);
