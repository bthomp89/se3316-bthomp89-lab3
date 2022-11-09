function validateInput(input) {
  return input
    .replace(/&/g, "&and;")
    .replace(/</, "&lt;")
    .replace(/>/, "&gt;")
    .replace(/"/, "&quot;");
}

//Shows Playlist Names in Dropdown
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
  var validatedInput = validateInput(searchedArtistId);
  console.log(validatedInput);
  if (validatedInput != "") {
    fetch(`/artists/name/${validatedInput}`).then((res) =>
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
  var validatedInput = validateInput(searchedValue);
  console.log(validatedInput);
  if (validatedInput != "") {
    fetch(`/tracks/track_id/${validatedInput}`).then((res) =>
      res.json().then((data) => {
        const l = document.getElementById("displayed_data_list");
        while (l.firstChild) {
          l.removeChild(l.firstChild);
        }
        data.forEach((e) => {
          const item = document.createElement("li");
          const addBtn = document.createElement("button");
          addBtn.id = "add_track_btn";
          addBtn.addEventListener("click", async function () {
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
              `Track ID: ${e.track_id}, Track Title: ${e.track_title}, Artist Name: ${e.artist_name}, Album Name: ${e.album_title}, Duration (sec): ${e.track_duration}    `
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
  var validatedInput = validateInput(searchedAlbum);
  console.log(validatedInput);

  if (validatedInput != "") {
    fetch(`/albums/${validatedInput}`).then((res) =>
      res.json().then((data) => {
        const l = document.getElementById("displayed_data_list");
        while (l.firstChild) {
          l.removeChild(l.firstChild);
        }
        data.forEach((e) => {
          const item = document.createElement("li");
          item.appendChild(
            document.createTextNode(
              `Album ID: ${e.album_id}, Album Title: ${e.album_title}, Tracks: ${e.album_tracks}, Date Released: ${e.album_date_released}, Artist Name: ${e.artist_name}`
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
  var validatedInput = validateInput(playListName);
  console.log(validatedInput);

  if (validatedInput != "") {
    fetch(`/playlists/create/${validatedInput}`, { method: "POST" });
  } else {
    console.log("Error When Creating Playlist");
  }
}

async function deletePlaylist() {
  var playListName = document.getElementById("playlist_input_name").value;
  var validatedInput = validateInput(playListName);
  console.log(validatedInput);

  if (validatedInput != "") {
    fetch(`/playlists/delete/${validatedInput}`, { method: "DELETE" });
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
            `Track ID: ${e.track_id}, Title: ${e.track_title}, Artist: ${e.artist_name}, Album: ${e.album_title}, Duration (sec): ${e.track_duration}`
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

async function sortByArtist() {
  var list = document.getElementById("displayed_data_list");
  var items = list.childNodes;
  var itemsArr = [];
  for (var i in items) {
    if (items[i].nodeType == 1) {
      itemsArr.push(items[i]);
    }
  }

  itemsArr.sort(function (a, b) {
    var test = a.innerHTML.match("Artist: ");
    var testtwo = a.innerHTML.match(", Alb");
    var testtest = b.innerHTML.match("Artist: ");
    var testtwotesttwo = b.innerHTML.match(", Alb");

    return a.innerHTML == b.innerHTML
      ? 0
      : a.innerHTML.substring(test.index, testtwo.index).toUpperCase() >
        b.innerHTML
          .substring(testtest.index, testtwotesttwo.index)
          .toUpperCase()
      ? 1
      : -1;
  });

  for (i = 0; i < itemsArr.length; ++i) {
    list.appendChild(itemsArr[i]);
  }
}

async function sortByAlbum() {
  var list = document.getElementById("displayed_data_list");
  var items = list.childNodes;
  console.log(items);
  var itemsArr = [];
  for (var i in items) {
    if (items[i].nodeType == 1) {
      itemsArr.push(items[i]);
    }
  }

  itemsArr.sort(function (a, b) {
    var test = a.innerHTML.match("Album: ");
    var testtwo = a.innerHTML.match(", Dur");
    var testtest = b.innerHTML.match("Album: ");
    var testtwotesttwo = b.innerHTML.match(", Dur");

    return a.innerHTML == b.innerHTML
      ? 0
      : a.innerHTML.substring(test.index, testtwo.index).toUpperCase() >
        b.innerHTML
          .substring(testtest.index, testtwotesttwo.index)
          .toUpperCase()
      ? 1
      : -1;
  });

  for (i = 0; i < itemsArr.length; ++i) {
    list.appendChild(itemsArr[i]);
  }
}

async function sortByDuration() {
  var list = document.getElementById("displayed_data_list");
  var items = list.childNodes;
  var itemsArr = [];
  for (var i in items) {
    if (items[i].nodeType == 1) {
      itemsArr.push(items[i]);
    }
  }

  itemsArr.sort(function (a, b) {
    var test = a.innerHTML.match(", Dur");
    var testtest = b.innerHTML.match(", Dur");

    console.log(test);
    return a.innerHTML == b.innerHTML
      ? 0
      : a.innerHTML.substring(test.index) >
        b.innerHTML.substring(testtest.index)
      ? 1
      : -1;
  });

  for (i = 0; i < itemsArr.length; ++i) {
    list.appendChild(itemsArr[i]);
  }
}

async function sortByTrack() {
  var list = document.getElementById("displayed_data_list");
  var items = list.childNodes;
  console.log(items);
  var itemsArr = [];
  for (var i in items) {
    if (items[i].nodeType == 1) {
      itemsArr.push(items[i]);
    }
  }

  itemsArr.sort(function (a, b) {
    var test = a.innerHTML.match("Title: ");
    var testtwo = a.innerHTML.match(", Art");
    var testtest = b.innerHTML.match("Title: ");
    var testtwotesttwo = b.innerHTML.match(", Art");

    return a.innerHTML == b.innerHTML
      ? 0
      : a.innerHTML.substring(test.index, testtwo.index).toUpperCase() >
        b.innerHTML
          .substring(testtest.index, testtwotesttwo.index)
          .toUpperCase()
      ? 1
      : -1;
  });

  for (i = 0; i < itemsArr.length; ++i) {
    list.appendChild(itemsArr[i]);
  }
}
