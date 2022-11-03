const connection = require("./db.js");
const mysql = require("mysql");

function insertRow(data, table) {
  let insertQuery = "";
  let query = null;
  //console.log(data.track_id);
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
  } else if (table == "Artists") {
    insertQuery =
      "INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
    query = mysql.format(insertQuery, [
      "Artists",
      "artist_id",
      "artist_name",
      "artist_active_year_begin",
      "artist_active_year_end",
      "artist_location",
      "artist_associated_labels",
      "artist_handle",
      data.artist_id,
      data.artist_name,
      data.artist_active_year_begin,
      data.artist_active_year_end,
      data.artist_location,
      data.artist_associated_labels,
      data.artist_handle,
    ]);
  } else if (table == "Tracks") {
    insertQuery =
      "INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    query = mysql.format(insertQuery, [
      "Tracks",
      "track_id",
      "album_id",
      "album_title",
      "artist_id",
      "artist_name",
      "track_date_created",
      "track_date_recorded",
      "track_duration",
      "track_genres",
      "track_language_code",
      "track_listens",
      "track_number",
      "track_title",
      data.track_id,
      data.album_id,
      data.album_title,
      data.artist_id,
      data.artist_name,
      data.track_date_created,
      data.track_date_recorded,
      data.track_duration,
      data.track_genres,
      data.track_language_code,
      data.track_listens,
      data.track_number,
      data.track_title,
    ]);
  } else {
    //do nothing
  }
  connection.query(query, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

module.exports = insertRow;
