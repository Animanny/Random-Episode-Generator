const express = require("express");
const pug = require("pug");
const request = require("request");
const util = require("util");

const movieDatabase = util.promisify(request);

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");

app.use("/static", express.static("./static/"));
app.use(express.json());

app.get("/", (req, res) => {
	res.render("index");
});

function getSeason(seasons, season) {
	for (let i = 0; i < seasons.length; i++) {
		if (seasons[i].season_number == season) {
			return i;
		}
	}
}

app.post("/getepisode", (req, res) => {
	var episode,
		season,
		episode_title,
		episode_description,
		show_poster,
		episode_poster;
	var show_id; //DEFINING THE ID
	movieDatabase(
		"https://api.themoviedb.org/3/search/tv?api_key=34bbe0517e6d8f59540de923df8952bc&query=" +
			req.body.show +
			"&page=1",
		{ json: false },
		(err, response, body) => {
			if (err) {
				return console.log(err);
			}
			try {
				results = JSON.parse(body);
				show_id = results.results[0].id;
			} catch (error) {}
			movieDatabase(
				"https://api.themoviedb.org/3/tv/" +
					show_id +
					"?api_key=34bbe0517e6d8f59540de923df8952bc&language=en-US",
				{ json: false },
				(err, response, body) => {
					if (err) {
						return console.log(err);
					}
					try {
						results = JSON.parse(body);

						show_poster = results["backdrop_path"];
						season =
							Math.floor(
								Math.random() *
									(results.number_of_seasons - 1 + 1)
							) + 1;

						episode =
							Math.floor(
								Math.random() *
									(results.seasons[
										getSeason(results.seasons, season)
									].episode_count -
										1 +
										1)
							) + 1;
					} catch (error) {}
					movieDatabase(
						"https://api.themoviedb.org/3/tv/" +
							show_id +
							"/season/" +
							season +
							"/episode/" +
							episode +
							"?api_key=34bbe0517e6d8f59540de923df8952bc&language=en-US",
						{ json: false },
						(err, response, body) => {
							if (err) {
								return console.log(err);
							}
							try {
								results = JSON.parse(body);
								episode_title = results.name;
								console.log(
									"S" +
										season +
										"E" +
										episode +
										" - Title: " +
										episode_title
								);
								episode_description = results.overview;
								episode_poster = results.still_path;
							} catch (error) {}
							ep_data = {
								season: season,
								episode: episode,
								desc: episode_description,
								episode_poster: episode_poster,
								show_poster: show_poster,
								title: episode_title,
							};
							res.send(ep_data);
						}
					);
				}
			);
		}
	);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
