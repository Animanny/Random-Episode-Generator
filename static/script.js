function getEpisode() {
	let showinfo;
	let showname = document.getElementById("showNameInput").value;

	episode = {
		show: document.getElementById("showNameInput").value,
	};

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			showinfo = JSON.parse(this.responseText);
			if (showinfo.season != undefined && showinfo.episode != undefined) {
				document.getElementById("episodenumber").innerHTML =
					"Season: " +
					showinfo.season +
					" Episode: " +
					showinfo.episode;

				if (showinfo.desc) {
					document.getElementById("episodedesc").innerHTML =
						showinfo.desc;
				} else {
					document.getElementById("episodedesc").innerHTML =
						"Decription not available.";
				}

				if (showinfo.title != undefined) {
					document.getElementById("episodetitle").innerHTML =
						showinfo.title;
				} else {
					document.getElementById("episodetitle").innerHTML = "";
				}

				if (showinfo.episode_poster != undefined) {
					document.getElementById("epImage").src =
						"https://image.tmdb.org/t/p/original" +
						showinfo.episode_poster;
				} else {
					if (showinfo.show_poster != undefined) {
						document.getElementById("epImage").src =
							"https://image.tmdb.org/t/p/original" +
							showinfo.show_poster;
					} else {
						document.getElementById("epImage").src = null;
					}
				}
			} else {
				document.getElementById("episodenumber").innerHTML =
					"Sorry, we weren't able to find that show";
				document.getElementById("episodetitle").innerHTML = "";
				document.getElementById("episodedesc").innerHTML = "";
				document.getElementById("epImage").src = "";
			}
		}
	};
	xhttp.open("POST", "/getepisode", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(episode));
}

function search(ele) {
	if (event.key === "Enter") {
		getEpisode();
	}
}
