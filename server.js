const express = require("express");
const port = process.env.PORT || 8080;
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");
// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDb();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());

// Serve static files from 'uploads' directory
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "./client/build")));

// Route handlers
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/equipment", require("./routes/equipmentRoutes"));
app.use("/api/v1/nurses", require("./routes/nurseRoutes"));
app.use("/api/v1/contact", require("./routes/contactRoutes"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// Start the server
app.listen(port, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${port}`.bgYellow.black
  );
});
