const mysql = require("mysql");
const dbConfig = require("./app/config/db.config.js");

const express = require("express");
const cors = require("cors");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("static"));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Brayden's Lab 3." });
});

app.get("/genres", (req, res) => {
  let query = "SELECT genre_id, title, parent FROM Genres";
  //let query = mysql.format(selectQuery, ["todo", "user", userName]);
  // query = SELECT * FROM `todo` where `user` = 'shahid'
  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

app.get("/artists", (req, res) => {
  let query =
    "SELECT artist_id, artist_name, artist_active_year_begin, artist_active_year_end, artist_location, artist_associated_labels, artist_handle FROM Artists";
  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

app.get("/tracks/:track_id", (req, res) => {
  let selectQuery =
    "SELECT ??,??,??,??,??,??,??,??,??,??,?? FROM Tracks WHERE ?? = ?";
  let query = mysql.format(selectQuery, [
    "album_id",
    "album_title",
    "artist_id",
    "artist_name",
    "tags",
    "track_date_created",
    "track_date_recorded",
    "track_duration",
    "track_genres",
    "track_number",
    "track_title",
    "track_id",
    req.params.track_id,
  ]);

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//require("./app/routes/routes.js");
//app;

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
