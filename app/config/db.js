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

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully Connected to the Database.");
  addGenres();
  addAlbums();
});

module.exports = connection;
