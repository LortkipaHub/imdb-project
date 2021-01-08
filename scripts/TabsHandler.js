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

window.addEventListener("load", addTabButtonHandlers);