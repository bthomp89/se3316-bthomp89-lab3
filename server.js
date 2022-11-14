const mysql = require("mysql");
const dbConfig = require("./app/config/db.config.js");
const Joi = require("joi");
const { body, validationResult } = require("express-validator");

const express = require("express");
const cors = require("cors");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "lab3",
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
    console.log(data);
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
app.get("/tracks/track_id/:search_field", (req, res) => {
  let query = `SELECT track_id, track_title, artist_name, album_title, track_duration FROM Tracks WHERE track_title LIKE '%${req.params.search_field}%' OR album_title LIKE '%${req.params.search_field}%' LIMIT 15;`;

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//Get all the matching artist IDs for a given search pattern matching the artist's name.
app.get("/artists/name/:name", (req, res) => {
  let query = `SELECT artist_id, artist_name, 
  artist_active_year_begin, artist_active_year_end, 
  artist_location, artist_associated_labels, artist_handle FROM Artists WHERE artist_name LIKE '%${req.params.name}%' LIMIT 15;`;

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//Create a new list to save a list of tracks with a given list name. Return an error if name exists.
app.post("/playlists/create/:name", (req, res) => {
  // const schema = {
  //   name: Joi.string().min(2).max(20).required(),
  // };
  // const result = schema.validate(req.params.name);
  // console.log(result);

  let query = `CREATE TABLE ${req.params.name} (
    track_id INT NOT NULL PRIMARY KEY,
    track_title VARCHAR(255),
    artist_name VARCHAR(150),
    album_title VARCHAR(255),
    track_duration VARCHAR(50)
  )`;

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error");
    }
    res.send(data);
  });
});

//Save a list of track IDs to a given list name.
//Return an error if the list name does not exist
app.post(
  "/playlists/add/:playlist_name/:track_id/:track_title/:artist_name/:album_title/:duration",
  (req, res) => {
    let query = `INSERT INTO ${req.params.playlist_name} VALUES (${req.params.track_id}, '${req.params.track_title}', '${req.params.artist_name}', '${req.params.album_title}', '${req.params.duration}');`;
    connection.query(query, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error");
      }
      res.send(data);
    });
  }
);

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

//Delete a list of tracks with a given name , return a 500 error if the given list doesn’t exist
app.delete("/playlists/delete/:playlist_name", (req, res) => {
  let query = `DROP TABLE ${req.params.playlist_name}`;

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error");
    }
    res.send(data);
  });
});

//Get a list of list names
app.get("/playlists", (req, res) => {
  let query = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE 
  TABLE_SCHEMA = 'lab3' AND TABLE_NAME NOT LIKE 'Albums' 
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

//get album info given album name
app.get("/albums/:name", (req, res) => {
  let query = `SELECT album_id, album_title, album_tracks, album_date_released, artist_name FROM Albums WHERE album_title LIKE '%${req.params.name}%' LIMIT 15;`;

  connection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

//get info about playlist
app.get("/playlists/info/:playlist_name", (req, res) => {
  let query = `SELECT COUNT(*) AS tracks, SUM(track_duration) AS duration FROM ${req.params.playlist_name}`;

  if (req.params.playlist_name)
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
