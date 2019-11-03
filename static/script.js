

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
             if(showinfo.season != undefined && showinfo.episode != undefined){
                document.getElementById('episodenumber').innerHTML = "Season: "+showinfo.season+" Episode: "+showinfo.episode;
                if(showinfo.desc != undefined){
                    document.getElementById('episodedesc').innerHTML = showinfo.desc;
                    if(showinfo.title != undefined){
                        document.getElementById('episodetitle').innerHTML = showinfo.title;
                    } else {
                    }
                }else{
                    document.getElementById('episodedesc').innerHTML = "Decription not available."
                }
             } else {
                document.getElementById('episodenumber').innerHTML = "Sorry, we weren't able to find that show";
                document.getElementById('episodetitle').innerHTML = "";
                document.getElementById('episodedesc').innerHTML = "";
            }
         }
    };
    xhttp.open("POST", "/getepisode", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(episode));
}

function search(ele) {
    if(event.key === 'Enter') {
        getEpisode();        
    }
}