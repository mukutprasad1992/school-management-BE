
var mongoose = require("mongoose");

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);

mongoose.connection.on("error", (error) => {
  console.info(`connection failed: ${error}`);
});

mongoose.connection.on("connected", (connected) => {
  console.info(`Successfully connected with Database!`);
});
