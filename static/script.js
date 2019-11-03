

function getEpisode(){
    let showname = document.getElementById('showNameInput').value;

    episode = {
        "show": document.getElementById('showNameInput').value
    }

    console.log(episode);


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             //alert(this.responseText);
             showinfo = JSON.parse(this.responseText);
             document.getElementById('episodenumber').innerHTML = "Season: "+showinfo.season+" Episode: "+showinfo.episode;
             document.getElementById('episodetitle').innerHTML = showinfo.desc;
         }
    };
    xhttp.open("POST", "https://randomepisodegenerator.herokuapp.com/getepisode", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(episode));
}