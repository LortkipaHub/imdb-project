const N_ITEMS_IN_TABLE = 20;


function load(address, table, IdExtractor){
    

    fetch(address, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "772da9c3f4msh660e5690bff9be7p1a3805jsnd4ec8e88c144",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
        }
    })
    .then(response => {
        response.json().then((data) =>  getDataByMovieIds(data, table, IdExtractor))
        
    })
    .catch(err => {
        console.error(err);
    });


}

function getIdForTopRated(data){
    return  data['id'];

}

function getIdForMositPopular(data){
    return data
}
function loadMainPageDataInTables(){
    load("https://imdb8.p.rapidapi.com/title/get-top-rated-movies", "#topRatedMoviesContent", getIdForTopRated);

    load("https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US",
                                                                        "#mostPopularMoviesContent", getIdForMositPopular);

    load("https://imdb8.p.rapidapi.com/title/get-top-rated-tv-shows", "#topRatedTvShowsContent", getIdForTopRated);

    load("https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows?homeCountry=US&purchaseCountry=US&currentCountry=US",
                                                                     "#mostPopularTvShowsContent", getIdForMositPopular);


}

function getDataByMovieIds(movieIds, table, IdExtractor){
    fetchPromises = []
    for (let i=0 ; i < N_ITEMS_IN_TABLE ; i++){
        id = IdExtractor(movieIds[i])
        titleString = "/title/";
        id = id.substring(titleString.length , id.length-1);
        fetchPromises[i] = fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${id}&r=json`, {
	        "method": "GET",
	        "headers": {
		    "x-rapidapi-key": "772da9c3f4msh660e5690bff9be7p1a3805jsnd4ec8e88c144",
		    "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
	        }
        }).then(data=>data.json());

    }

    Promise.all(fetchPromises).then((data) => loadDataInTable(table,data));

    


}

function addOneRow(table, imageUrl,movieName,movieRating,movieId, position){

    let newHtml =        
    `   <tr id="aaa">
            <td>
                <img src="${imageUrl}" height="75" width="50"/> 
            </td>

            <td>
               ${position} )  <a href="movie.html?${movieId}"> ${movieName} </a>
            </td>

            <td>
                ${movieRating} / 10
            </td>

            </tr>
        `;
    table.insertAdjacentHTML( 'beforeend', newHtml );

}



function loadDataInTable(tableId, movieData){
    console.log("loadDataInTable hello");
    
    for (let i = 0 ; i < movieData.length ; i++ ){
        currentData = movieData[i];
        console.log(currentData);
        let table = document.querySelector(tableId);
        let imageUrl =  currentData["Poster"];
        let movieName = currentData["Title"];
        let movieRating = currentData["imdbRating"];
        let movieId = currentData["imdbID"];
        addOneRow(table,imageUrl,movieName,movieRating,movieId,i+1);

    }


   

}





window.addEventListener("load",loadMainPageDataInTables);


