require("dotenv").config();
var mongoose = require("mongoose");

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);

mongoose.connection.on("error", (err) => {
  console.log("connection failed");
});

mongoose.connection.on("connected", (connected) => {
  console.log("Successfully connected with Database!");
});
