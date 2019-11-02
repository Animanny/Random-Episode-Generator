const express = require('express');
const pug = require('pug');
const request = require('request');
const util = require('util');

const movieDatabase = util.promisify(request);

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');

app.use("/static", express.static('./static/'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/getepisode',(req,res)=>{
  var episode,season,episode_title,episode_description,poster;
  var show_id; //DEFINING THE ID
  movieDatabase('https://api.themoviedb.org/3/search/tv?api_key=34bbe0517e6d8f59540de923df8952bc&query='+req.body.show+'&page=1', { json: false }, (err, response, body) => {
      if (err) { return console.log(err); }
      results = JSON.parse(body);
      show_id = results.results[0].id;
      console.log(show_id);
    movieDatabase('https://api.themoviedb.org/3/tv/'+show_id+'?api_key=34bbe0517e6d8f59540de923df8952bc&language=en-US', { json: false }, (err, response, body) => {
      if (err) { return console.log(err); }
      results = JSON.parse(body);
      season = Math.round(Math.random() * results.number_of_seasons);
      episode = Math.round(Math.random() * results.seasons[season-1].episode_count);
      movieDatabase('https://api.themoviedb.org/3/tv/'+show_id+'/season/'+season+'/episode/'+episode+'?api_key=34bbe0517e6d8f59540de923df8952bc&language=en-US', { json: false }, (err, response, body) => {
        if (err) { return console.log(err); }
        results = JSON.parse(body);
        episode_title = results.name;
        episode_description = results.overview;
        poster = results.still_path;
        console.log("Season: "+season+" Episode: "+episode);

        ep_data = {
          "season":season,
          "episode":episode,
          "desc":episode_description,
          "poster":poster
        }
        res.send(ep_data);

        });
    });
  });
})

app.listen(port, () => {
  console.log(`listening on port ${ port }`);
});

