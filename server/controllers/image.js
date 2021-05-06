"use strict";

const Image = require("../models/image");






// Create and Save a new image
exports.create = (req, res) => {
  const image = new Image({
    imageUrl: req.file.filename,
    lableName: req.file.originalname,
  });

  Image.create(image,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Image.",
      });
    else {
      res.send('Single FIle upload success');}
  });
};

// Retrieve all Image from the database.
exports.findAll = (req, res) => {
  Image.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Image.",
      });
    else {
      data.map((e)=>{
        e.ImageUrl = `/${e.ImageUrl}`;
      })
      res.send(data);}
  });
};

