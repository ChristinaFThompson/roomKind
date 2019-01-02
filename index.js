const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const Residential = require("./models/residential.js");
const Shelter = require("./models/shelter.js");
const Guest = require("./models/guest.js");

const app = express();

app.set("port", process.env.PORT || 3007);
app.use(parser.json());
app.use(cors());

app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

app.get("/api/roomKind", (req, res) => {
  Shelter.find()
    .then(shelter => {
      res.json(shelter);
    })
    .catch(err => {
      console.log(err);
    });
});

// Post to create new Shelter
app.post("/project3roomKind", (req, res) => {
  console.log(req.body);
  Shelter.create({
    name: req.body.name,
    location: req.body.location,
    image: req.body.image,
    beds: req.body.beds
  }).then(shelter => {
    res.send(shelter);
  });
});

// POST new residence
app.post("/project3roomKind/residences", (req, res) => {
  console.log(req.body.image);
  console.log(req.body);
  Residential.create({
    name: req.body.name,
    image: req.body.image,
    location: req.body.location,
    numberOfDays: req.body.numberOfDays,
    beds: req.body.beds
  }).then(residentials => {
    res.send(residentials);
  });
});

app.get("/api/roomKind/residences", (req, res) => {
  Residential.find()
    .then(resident => {
      res.json(resident);
    })
    .catch(err => {
      console.log(err);
    });
});

app.put("/editShelter/:id", (req, res) => {
  console.log({ _id: req.params.id });
  Shelter.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
app.put("/editResidence/:id", (req, res) => {
  console.log({ _id: req.params.id });
  Residential.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
// Reserve resident
app.delete("/reserveResidence/:id", (req, res) => {
  Residential.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//Delete Residence once reserved
app.delete("/deleteResidence/:id", (req, res) => {
  Residential.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//Delete Shelters once reserved
app.delete("/deleteShelter/:id", (req, res) => {
  console.log({ _id: req.params.id });
  Shelter.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.listen(3007, () => {
  console.log("running on port 3007");
});
