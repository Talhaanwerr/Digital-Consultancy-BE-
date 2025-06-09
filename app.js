require("express-async-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./router/routes.js");
const error = require("./middlewares/error.middleware.js");

// Global error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Do not exit process, just log the error
});

// Global error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Do not exit process, just log the error
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // Configure CORS
// app.use(cors({
//   origin: ['http://localhost:5173'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use("/api", routes);

app.get("/users", (req, res) => {
  res.json([{ name: "John Doee" }]);
});

app.use(error);

module.exports = app;
