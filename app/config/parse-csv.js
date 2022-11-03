const fs = require("fs");
const insertRow = require("./insert-rows.js");
const parser = require("csv-parser");

fs.createReadStream("../data/genres.csv")
  .pipe(parser({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    //console.log(row);
    insertRow(row, "Genres");
  })
  .on("end", function () {
    console.log("Complete adding to Genres");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
fs.createReadStream("../data/raw_albums.csv")
  .pipe(parser({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    //console.log(row);
    insertRow(row, "Albums");
  })
  .on("end", function () {
    console.log("Complete adding to Albums");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
fs.createReadStream("../data/raw_artists.csv")
  .pipe(parser({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    //onsole.log(row);
    insertRow(row, "Artists");
  })
  .on("end", function () {
    console.log("Complete adding to Artists");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

fs.createReadStream("../data/raw_tracks.csv")
  .pipe(parser({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    //console.log(row);
    insertRow(row, "Tracks");
  })
  .on("end", function () {
    console.log("Complete adding to Tracks");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
