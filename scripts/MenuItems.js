function addMenuItemListeners(){
    let RandomTopRatedMovieItems = document.querySelectorAll(".RandomTopRatedMovie");
    let RandomMostPopularMovieItems = document.querySelectorAll(".RandomMostPopularMovie");
    let RandomTopRatedTvShowItems = document.querySelectorAll(".RandomTopRatedTvShow");
    let RandomMostPopularTvShowItems = document.querySelectorAll(".RandomMostPopularTvShow");

    addListener(RandomTopRatedMovieItems[0] , "https://imdb8.p.rapidapi.com/title/get-top-rated-movies" ,  "movie.html",  getIdForTopRated );
    addListener(RandomTopRatedMovieItems[1] , "https://imdb8.p.rapidapi.com/title/get-top-rated-movies" ,  "movie.html",  getIdForTopRated );

    addListener(RandomMostPopularMovieItems[0] , "https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US", 
    "movie.html" , getIdForMostPopular);

    addListener(RandomMostPopularMovieItems[1] , "https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US", 
    "movie.html" , getIdForMostPopular);

    addListener(RandomTopRatedTvShowItems[0], "https://imdb8.p.rapidapi.com/title/get-top-rated-tv-shows",   "movie.html",  getIdForTopRated )
    addListener(RandomTopRatedTvShowItems[1], "https://imdb8.p.rapidapi.com/title/get-top-rated-tv-shows",   "movie.html",  getIdForTopRated )

    addListener(RandomMostPopularTvShowItems[0], "https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows?homeCountry=US&purchaseCountry=US&currentCountry=US",
    "#mostPopularTvShowsContent" , "movie.html", getIdForMostPopular)

    addListener(RandomMostPopularTvShowItems[1], "https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows?homeCountry=US&purchaseCountry=US&currentCountry=US",
    "#mostPopularTvShowsContent" , "movie.html", getIdForMostPopular)



}

function addListener(item , link , page , IdExtractor){
    item.addEventListener("click" ,function() {loadDataWithLink(link , page , IdExtractor) })
}

function getIdForTopRated(data){
    return  data['id'];

}

function getIdForMostPopular(data){
    return data
}

function loadDataWithLink(address, pageName, IdExtractor){
        
    console.log("aaaa")

    fetch(address, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "772da9c3f4msh660e5690bff9be7p1a3805jsnd4ec8e88c144",
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
    console.log(data)
    let item = data[Math.floor(Math.random() * data.length)];
    var id = IdExtractor(item)
    let titleString = "/title/";
    id = id.substring(titleString.length , id.length-1);
    window.location.href = `./${pageName}?id=${id}`


}











window.addEventListener("load", addMenuItemListeners)