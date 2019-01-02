const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const ResidentialSchema = new mongoose.Schema({
  name: String,
  image: String,
  location: String,
  numberOfDays: Number,
  beds: Number
});

module.exports = mongoose.model("Residential", ResidentialSchema);
