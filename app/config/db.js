const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

const addGenres = function (error) {
  if (error) {
    throw error;
  }
  var sql = `CREATE TABLE IF NOT EXISTS Genres (
    genre_id INT NOT NULL PRIMARY KEY,
    num_tracks INT,
    parent INT,
    title VARCHAR(255),
    top_level INT
  )`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Genres Table created");
  });
};

const addAlbums = function (error) {
  if (error) {
    throw error;
  }
  var sql = `CREATE TABLE IF NOT EXISTS Albums (
    album_id INT NOT NULL PRIMARY KEY,
    album_comments INT,
    album_date_created VARCHAR(50),
    album_date_released VARCHAR(50),
    album_engineer VARCHAR(255),
    album_listens INT,
    album_producer VARCHAR(255),
    album_title VARCHAR(255),
    album_tracks INT,
    album_type VARCHAR(100),
    artist_name VARCHAR(100)
  )`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Albums Table created");
  });
};

const addArtists = function (error) {
  if (error) {
    throw error;
  }
  var sql = `CREATE TABLE IF NOT EXISTS Artists (
    artist_id INT NOT NULL PRIMARY KEY,
    artist_name VARCHAR(150),
    artist_active_year_begin VARCHAR(50),
    artist_active_year_end VARCHAR(50),
    artist_location VARCHAR(1055),
    artist_associated_labels VARCHAR(255),
    artist_handle VARCHAR(100)
  )`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Artists Table created");
  });
};

const addTracks = function (error) {
  if (error) {
    throw error;
  }
  var sql = `CREATE TABLE IF NOT EXISTS Tracks (
    track_id INT NOT NULL PRIMARY KEY,
    album_id VARCHAR(50),
    album_title VARCHAR(255),
    artist_id INT(50),
    artist_name VARCHAR(150),
    track_date_created VARCHAR(50),
    track_date_recorded VARCHAR(50),
    track_duration VARCHAR(50),
    track_genres VARCHAR(4500),
    track_language_code VARCHAR(25),
    track_listens INT,
    track_number INT,
    track_title VARCHAR(255)
  )`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tracks Table created");
  });
};

const addPlaylists = function (error) {
  if (error) {
    throw error;
  }
  var sql = `CREATE TABLE IF NOT EXISTS Playlists (
    playlist_name VARCHAR(50) NOT NULL PRIMARY KEY
  )`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Playlist Table created");
  });
};

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully Connected to the Database.");
  addGenres();
  addAlbums();
  addArtists();
  addTracks();
  addPlaylists();
});

module.exports = connection;
