const express= require('express');
const mongoose = require("mongoose");
const path = require("path");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bookstore");

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
connectDB();

const server = express();
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));

server.use(express.static("public"));
server.use("/uploads", express.static("uploads"));

const bookRoutes = require("./routes/bookRoutes");
server.use("/", bookRoutes);

server.listen(8000, () => {
  console.log("Server Running");
});