require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Senior = require("./models/Senior");
const Experience = require("./models/Experience");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/farewell2026";

/* --------------------------------
   DATABASE CONNECTION
-------------------------------- */
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB database."))
  .catch((err) => console.error("MongoDB connection error:", err));

/* --------------------------------
   MIDDLEWARE
-------------------------------- */
app.use(cors());
app.use(express.json());

/* --------------------------------
   STATIC UPLOADS
-------------------------------- */
const uploadsDirectory = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory);
}
app.use("/uploads", express.static(uploadsDirectory));

/* --------------------------------
   MULTER CONFIGURATION
-------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG and WEBP images are allowed."));
    }
  },
});

/* --------------------------------
   ROUTES
-------------------------------- */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Before The Final Cut backend is running with MongoDB.",
  });
});

/* SENIOR REGISTRATION / TICKET */
app.post("/api/seniors", upload.single("photo"), async (req, res) => {
  try {
    const { name, usn } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (!usn || !usn.trim()) {
      return res.status(400).json({
        success: false,
        message: "USN is required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Photo is required.",
      });
    }

    const senior = await Senior.create({
      name: name.trim(),
      usn: usn.trim().toUpperCase(),
      photo: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      message: "Senior registration successful.",
      senior: {
        id: senior._id.toString(),
        name: senior.name,
        usn: senior.usn,
        photo: senior.photo,
        createdAt: senior.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating senior:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong creating the ticket.",
    });
  }
});

/* SHARE EXPERIENCE */
app.post("/api/experiences", async (req, res) => {
  try {
    const { experience } = req.body;

    if (!experience || !experience.trim()) {
      return res.status(400).json({
        success: false,
        message: "Experience cannot be empty.",
      });
    }

    const newExperience = await Experience.create({
      experience: experience.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Experience saved successfully.",
      experience: newExperience,
    });
  } catch (error) {
    console.error("Error saving experience:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong saving your experience.",
    });
  }
});

/* GET ALL SENIORS */
app.get("/api/seniors", async (req, res) => {
  try {
    const seniors = await Senior.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      seniors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve seniors.",
    });
  }
});

/* GET ALL EXPERIENCES */
app.get("/api/experiences", async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve experiences.",
    });
  }
});

/* ERROR HANDLER */
app.use((error, req, res, next) => {
  console.error(error);
  res.status(400).json({
    success: false,
    message: error.message || "Something went wrong.",
  });
});

/* START SERVER */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});