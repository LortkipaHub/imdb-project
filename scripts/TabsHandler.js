let deactivateAllTabs = function(){
    let allButtons = document.querySelectorAll(".tablinks")
    let allTabs = document.querySelectorAll(".tableContent")
    for (let i = 0; i<allButtons.length; i++){
        allButtons[i].style.backgroundColor = "#f1f1f1";
    }
    for (let i = 0; i<allTabs.length; i++){
        allTabs[i].style.display="none";
    }

}


let activateTab = function(button,tab,color){
    deactivateAllTabs();
    button.style.backgroundColor = color;
    tab.style.display = "block";

}


let addTabButtonHandlers = function () {

    let topRatedMoviesButton = document.querySelector("#topRatedMoviesTabButton");
    let mostPopularMoviesButton = document.querySelector("#mostPopularMoviesTabButton");
    let topRatedTvShowsButton = document.querySelector("#topRatedTvShowsTabButton");
    let mostPopularTvShowsButton = document.querySelector("#mostPopularTvShowsTabButton");

    topRatedMoviesButton.addEventListener("click",function(){
        let topRatedMoviesTab = document.querySelector("#topRatedMoviesContent");
        activateTab(topRatedMoviesButton,topRatedMoviesTab,"#FEAD89");
    });
    mostPopularMoviesButton.addEventListener("click",function(){
        let mostPopularMoviesTab = document.querySelector("#mostPopularMoviesContent");
        activateTab(mostPopularMoviesButton,mostPopularMoviesTab,"#FEFF9E");
    });
    
    topRatedTvShowsButton.addEventListener("click",function(){
        let topRatedTvShowsTab = document.querySelector("#topRatedTvShowsContent");
        activateTab(topRatedTvShowsButton,topRatedTvShowsTab,"#b0e575");
    });
    mostPopularTvShowsButton.addEventListener("click",function(){
        let mostPopularTvShowsTab = document.querySelector("#mostPopularTvShowsContent");
        activateTab(mostPopularTvShowsButton,mostPopularTvShowsTab,"#86D9AC");
    });

    topRatedMoviesButton.click();
}

function a (){
    
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open("GET", "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-similar-movies&imdb=tt1375666&page=1");
xhr.setRequestHeader("x-rapidapi-key", "772da9c3f4msh660e5690bff9be7p1a3805jsnd4ec8e88c144");
xhr.setRequestHeader("x-rapidapi-host", "movies-tvshows-data-imdb.p.rapidapi.com");

xhr.send(data);
}
window.addEventListener("load",a);
window.addEventListener("load", addTabButtonHandlers);