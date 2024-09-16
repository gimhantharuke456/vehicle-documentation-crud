const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const vehicleRoutes = require("./routes/vehicle.route");
const vProfileRoutes = require("./routes/v.profile.route");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/budhdhika")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/vprofiles", vProfileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} s`);
});

module.exports = app; // For testing purposes
