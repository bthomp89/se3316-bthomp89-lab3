async function showPlaylist() {
  fetch("/playlists").then((res) =>
    res.json().then((data) => {
      const l = document.getElementById("dropbtn");
      while (l.firstChild) {
        l.removeChild(l.firstChild);
      }
      data.forEach((e) => {
        const item = document.createElement("option");
        const option = document.createTextNode(`${e.TABLE_NAME}`);
        //l.addEventListener("change", displayPlaylist);
        item.appendChild(option);
        l.appendChild(item);
      });
    })
  );
}

async function findGenres() {
  fetch("/genres").then((res) =>
    res.json().then((data) => {
      const l = document.getElementById("displayed_data_list");
      while (l.firstChild) {
        l.removeChild(l.firstChild);
      }
      data.forEach((e) => {
        const item = document.createElement("li");
        item.appendChild(
          document.createTextNode(
            `Genre ID: ${e.genre_id}, Name: ${e.title}, Parent: ${e.parent}`
          )
        );
        item.appendChild;
        l.appendChild(item);
      });
    })
  );
}

async function searchArtists() {
  var searchedArtistId = document.getElementById("searchfield").value;
  if (searchedArtistId != "") {
    fetch(`/artists/name/${searchedArtistId}`).then((res) =>
      res.json().then((data) => {
        const l = document.getElementById("displayed_data_list");
        while (l.firstChild) {
          l.removeChild(l.firstChild);
        }
        data.forEach((e) => {
          const item = document.createElement("li");
          item.appendChild(
            document.createTextNode(
              `Artist ID: ${e.artist_id}, Artist Name: ${e.artist_name}, Year Begin: ${e.artist_active_year_begin}, Year End: ${e.artist_active_year_end}, Location: ${e.artist_location}, Label: ${e.artist_associated_labels}, Handle: ${e.artist_handle}`
            )
          );
          item.appendChild;
          l.appendChild(item);
        });
      })
    );
  }
}

var trackID;
var trackTitle;
var artistName;
var albumTitle;
var trackDuration;

async function searchTracks() {
  var searchedValue = document.getElementById("searchfield").value;
  if (searchedValue != "") {
    fetch(`/tracks/track_id/${searchedValue}`).then((res) =>
      res.json().then((data) => {
        const l = document.getElementById("displayed_data_list");
        while (l.firstChild) {
          l.removeChild(l.firstChild);
        }
        data.forEach((e) => {
          const item = document.createElement("li");
          const addBtn = document.createElement("button");
          addBtn.id = "add_track_btn";
          addBtn.addEventListener("click", function () {
            trackID = `${e.track_id}`;
            trackTitle = `${e.track_title}`;
            artistName = `${e.artist_name}`;
            albumTitle = `${e.album_title}`;
            trackDuration = `${e.track_duration}`;
          });
          addBtn.addEventListener("click", addSongToPlaylist);
          addBtn.appendChild(document.createTextNode("Add"));
          item.appendChild(
            document.createTextNode(
              `Track ID: ${e.track_id}, Track Title: ${e.track_title}, Artist Name: ${e.artist_name}, Album Name: ${e.album_title}, Duration: ${e.track_duration}    `
            )
          );
          item.appendChild(addBtn);
          l.appendChild(item);
        });
      })
    );
  }
}

async function addSongToPlaylist() {
  const selectedPlaylist = document.getElementById("dropbtn").value;
  fetch(
    `/playlists/add/${selectedPlaylist}/${trackID}/${trackTitle}/${artistName}/${albumTitle}/${trackDuration}`,
    { method: "POST" }
  );
}

async function searchAlbums() {
  var searchedAlbum = document.getElementById("searchfield").value;
  if (searchedAlbum != "") {
    fetch(`/albums/${searchedAlbum}`).then((res) =>
      res.json().then((data) => {
        const l = document.getElementById("displayed_data_list");
        while (l.firstChild) {
          l.removeChild(l.firstChild);
        }
        data.forEach((e) => {
          const item = document.createElement("li");
          item.appendChild(
            document.createTextNode(
              `Album ID: ${e.album_id}, Album Title: ${e.album_title}, Tracks: ${e.album_tracks}, Date Released: ${e.album_date_released}`
            )
          );
          item.appendChild;
          l.appendChild(item);
        });
      })
    );
  }
}

async function createPlaylist() {
  var playListName = document.getElementById("playlist_input_name").value;
  if (playListName != "") {
    fetch(`/playlists/create/${playListName}`, { method: "POST" });
  } else {
    console.log("Error When Creating Playlist");
  }
}

async function deletePlaylist() {
  var playListName = document.getElementById("playlist_input_name").value;
  if (playListName != "") {
    fetch(`/playlists/delete/${playListName}`, { method: "DELETE" });
  } else {
    console.log("Error When Deleted Playlist");
  }
}

async function displayPlaylist() {
  const selectedPlaylist = document.getElementById("dropbtn").value;
  if (document.querySelector("#newDiv")) {
    document.getElementById("newDiv").remove();
  }
  fetch(`/playlists/tracks/${selectedPlaylist}`).then((res) =>
    res.json().then((data) => {
      const l = document.getElementById("displayed_data_list");
      while (l.firstChild) {
        l.removeChild(l.firstChild);
      }
      displayPlaylistInfo();
      data.forEach((e) => {
        const item = document.createElement("li");
        item.appendChild(
          document.createTextNode(
            `Track ID: ${e.track_id}, Title: ${e.track_title}, Artist: ${e.artist_name}, Album: ${e.album_title}, Duration: ${e.track_duration}`
          )
        );
        l.appendChild(item);
      });
    })
  );
}

async function displayPlaylistInfo() {
  const selectedPlaylist = document.getElementById("dropbtn").value;
  fetch(`/playlists/info/${selectedPlaylist}`).then((res) =>
    res.json().then((data) => {
      const l = document.getElementById("playlist_top");
      const newDiv = document.createElement("div");
      newDiv.id = "newDiv";
      data.forEach((e) => {
        const item = document.createElement("p");
        item.appendChild(
          document.createTextNode(
            `# of Tracks: ${e.tracks}, Duration (seconds): ${e.duration}`
          )
        );
        newDiv.appendChild(item);
        l.appendChild(newDiv);
      });
    })
  );
}
