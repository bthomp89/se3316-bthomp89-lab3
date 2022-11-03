const connection = require("./db.js");
const mysql = require("mysql");

function insertRow(data, table) {
  let insertQuery = "";
  let query = null;
  if (table == "Genres") {
    insertQuery = "INSERT INTO ?? (??,??,??,??,??) VALUES (?,?,?,?,?)";
    query = mysql.format(insertQuery, [
      "Genres",
      "genre_id",
      "num_tracks",
      "parent",
      "title",
      "top_level",
      data.genre_id,
      data["#tracks"],
      data.parent,
      data.title,
      data.top_level,
    ]);
  } else if (table == "Albums") {
    insertQuery =
      "INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    query = mysql.format(insertQuery, [
      "Albums",
      "album_id",
      "album_comments",
      "album_date_created",
      "album_date_released",
      "album_engineer",
      "album_listens",
      "album_producer",
      "album_title",
      "album_tracks",
      "album_type",
      "artist_name",
      data.album_id,
      data.album_comments,
      data.album_date_created,
      data.album_date_released,
      data.album_engineer,
      data.album_listens,
      data.album_producer,
      data.album_title,
      data.album_tracks,
      data.album_type,
      data.artist_name,
    ]);
  }
  connection.query(query, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

module.exports = insertRow;
