const mongoose = require("mongoose");

function connect() {
  mongoose.connect("mongodb://127.0.0.1:27017/api");

  mongoose.connection.once("open", () => {
    console.log("Connection stablished with mongo");
  });

  mongoose.connection.on("error", (err) => {
    console.log("something went wrong", err);
  });
}
module.exports = { connect };
