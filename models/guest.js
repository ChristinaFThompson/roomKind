const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const GuestSchema = new mongoose.Schema({
  name: String,
  arrivalTime: String,
  arrivalDate: String,
  numberOfDays: String
});

module.exports = mongoose.model("Guest", GuestSchema);
