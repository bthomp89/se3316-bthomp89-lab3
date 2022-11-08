/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropFunction() {
  document.getElementById("drop-content").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

//function to get all genre names, IDs and parent IDs
function findGenres() {
  fetch("/genres").then((res) =>
    res.json().then((data) => {
      const l = document.getElementById("displayed_data_list");
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
