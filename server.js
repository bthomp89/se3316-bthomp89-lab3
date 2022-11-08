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

//Get all available genre names, IDs and parent IDs
app.get("/genres", (req, res) => {
  let query = "SELECT genre_id, title, parent FROM Genres";
  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//Get the artist details (at least 6 key attributes) given  an artist ID.
app.get("/artists/:id", (req, res) => {
  let query = `SELECT artist_id, artist_name, 
  artist_active_year_begin, artist_active_year_end, 
  artist_location, artist_associated_labels, artist_handle FROM Artists WHERE artist_id = ${req.params.id};`;
  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//Get the following details for a given track ID: album_id, album_title, artist_id,
//artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title
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

//Get the first n number of matching track IDs for a given search pattern matching the track title or album.
//If the number of matches is less than n, then return all matches. Please feel free to pick a suitable value for n.
//NOTE: HAVE TO ADD IN THE N PART
app.get("/tracks/track_id/:search_field", (req, res) => {
  let query = `SELECT track_id FROM Tracks WHERE track_title LIKE '%${req.params.search_field}%' OR album_title LIKE '%${req.params.search_field}%';`;

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//Get all the matching artist IDs for a given search pattern matching the artist's name.
app.get("/artists/artist_id/:search_field", (req, res) => {
  let query = `SELECT artist_id FROM Artists WHERE artist_name LIKE '%${req.params.search_field}%';`;

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//Create a new list to save a list of tracks with a given list name. Return an error if name exists.
//NOTE: NEED TO ADD ERROR PART
app.post("/playlists/create/:name", (req, res) => {
  let query = `CREATE TABLE IF NOT EXISTS ${req.params.name} (
    track_id INT NOT NULL PRIMARY KEY
  )`;

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//Save a list of track IDs to a given list name.
//Return an error if the list name does not exist.
//Replace existing track IDs with new values if the list exists
//NOTE: ADD PART 2 and 3 of this question
app.post("/playlists/add/:playlist_name/:track_id", (req, res) => {
  let query = `INSERT INTO ${req.params.playlist_name} VALUES (${req.params.track_id})`;

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//Get the list of track IDs for a given list
app.get("/playlists/tracks/:playlist_name", (req, res) => {
  let query = `SELECT * FROM ${req.params.playlist_name}`;

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//Delete a list of tracks with a given name.
//Return an error if the given list doesn’t exist
//NOTE: Do part 2 of this part
app.delete("/playlists/delete/:playlist_name", (req, res) => {
  let query = `DROP TABLE ${req.params.playlist_name}`;

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//Get a list of list names,
//number of tracks that are saved in each list and the total play time of each list.
//NOTE: Do Part 2 for this question
app.get("/playlists", (req, res) => {
  let query = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE 
  TABLE_SCHEMA = 'se3316-bthomp89-lab3' AND TABLE_NAME NOT LIKE 'Albums' 
  AND TABLE_SCHEMA = 'se3316-bthomp89-lab3' AND TABLE_NAME NOT LIKE 'Artists' 
  AND TABLE_SCHEMA = 'se3316-bthomp89-lab3' AND TABLE_NAME NOT LIKE 'Genres' 
  AND TABLE_SCHEMA = 'se3316-bthomp89-lab3' AND TABLE_NAME NOT LIKE 'Tracks'
  AND TABLE_SCHEMA = 'se3316-bthomp89-lab3' AND TABLE_NAME NOT LIKE 'Tracks';`;

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
