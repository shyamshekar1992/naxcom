"use strict";

const sql = require("../config/db");
// constructor
const Image = function (image) {
  this.imageUrl = image.imageUrl;
  this.lableName = image.lableName;
};

Image.create = (newImage, result) => {
  sql.query("INSERT INTO tblimagelist SET ?", newImage, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newImage });
  });
};

Image.getAll = (result) => {
  sql.query(
    `select
    I.Id as 'key',
    I.lableName,
    I.ImageUrl,
    I.CreatedDate
  from
    tblimagelist as I`,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};





module.exports = Image;
