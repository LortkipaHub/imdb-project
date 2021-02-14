function addMenuItemListeners(){
    let RandomTopRatedMovieItems = document.querySelectorAll(".RandomTopRatedMovie");
    let RandomMostPopularMovieItems = document.querySelectorAll(".RandomMostPopularMovie");
    let RandomTopRatedTvShowItems = document.querySelectorAll(".RandomTopRatedTvShow");
    let RandomMostPopularTvShowItems = document.querySelectorAll(".RandomMostPopularTvShow");
    let RandomMostPopularCelebItems = document.querySelectorAll(".RandomMostPopularCeleb");
    let RandomBornTodayCelebItems =  document.querySelectorAll(".RandomBornTodayCeleb");

    addListener(RandomTopRatedMovieItems[0] , "https://imdb8.p.rapidapi.com/title/get-top-rated-movies" ,  "#movie",  getIdForTopRated );
    addListener(RandomTopRatedMovieItems[1] , "https://imdb8.p.rapidapi.com/title/get-top-rated-movies" ,  "#movie",  getIdForTopRated );

    addListener(RandomMostPopularMovieItems[0] , "https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US", 
    "#movie" , getIdForMostPopular);

    addListener(RandomMostPopularMovieItems[1] , "https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US", 
    "#movie" , getIdForMostPopular);

    addListener(RandomTopRatedTvShowItems[0], "https://imdb8.p.rapidapi.com/title/get-top-rated-tv-shows",   "#movie",  getIdForTopRated )
    addListener(RandomTopRatedTvShowItems[1], "https://imdb8.p.rapidapi.com/title/get-top-rated-tv-shows",   "#movie",  getIdForTopRated )

    addListener(RandomMostPopularTvShowItems[0], "https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows?homeCountry=US&purchaseCountry=US&currentCountry=US",
    "#movie", getIdForMostPopular)

    addListener(RandomMostPopularTvShowItems[1], "https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows?homeCountry=US&purchaseCountry=US&currentCountry=US",
    "#movie", getIdForMostPopular)

    addListener(RandomMostPopularCelebItems[0], "https://imdb8.p.rapidapi.com/actors/list-most-popular-celebs" , "#celeb" , getIdForCeleb)
    addListener(RandomMostPopularCelebItems[1], "https://imdb8.p.rapidapi.com/actors/list-most-popular-celebs" , "#celeb" , getIdForCeleb)
    
    
    addListener(RandomBornTodayCelebItems[0], getBornTodayLink() , "#celeb" , getIdForCeleb)
    addListener(RandomBornTodayCelebItems[1], getBornTodayLink() , "#celeb" , getIdForCeleb)



}

function getBornTodayLink(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

    return `https://imdb8.p.rapidapi.com/actors/list-born-today?month=${mm}&day=${dd}`


}

function addListener(item , link , page , IdExtractor){
    item.addEventListener("click" ,function() {loadDataWithLink(link , page , IdExtractor) })
}

function getIdForTopRated(data){
    let titleString = "/title/";

    var id = data['id'];
    id = id.substring(titleString.length , id.length-1);
    return  id

}

function getIdForMostPopular(data){
    let titleString = "/title/";
    var id = data;
    id = id.substring(titleString.length , id.length-1);
    return id
}

function getIdForCeleb(data){
    let nameString = "/name/"
    var id = data;
    id = id.substring(nameString.length , id.length-1);
    return id

}

function loadDataWithLink(address, pageName, IdExtractor){
        
    

    fetch(address, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "c142253091msh0bc8b7c320fa0f9p148838jsn74ba0ed9bc02",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
        }
    })
    .then(response => {
        response.json().then((data) => redirectToRandomPage(data,pageName, IdExtractor))
        
    })
    .catch(err => {
        console.error(err);
    });


}

function redirectToRandomPage(data, pageName, IdExtractor){
    let item = data[Math.floor(Math.random() * data.length)];
    var id = IdExtractor(item)

    window.location.href = `./${pageName}?id=${id}`


}











window.addEventListener("load", addMenuItemListeners)