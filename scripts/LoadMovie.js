function loadMovieContent(){

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString); 

    let id = urlParams.get('id');
    

    fetch(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${id}`, {
	    "method": "GET",
    	"headers": {
	    	"x-rapidapi-key": "772da9c3f4msh660e5690bff9be7p1a3805jsnd4ec8e88c144",
		    "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
	    }
    })
    .then(response => {
        response.json().then(data => loadDataOnPage(data));
    })
    .catch(err => {
	    console.error(err);
    });


}


function loadDataOnPage(data){
    let image = document.querySelector("#imageDiv>img");
    let movieInfo = document.querySelector("#movieInfo");
    let table = document.querySelector("#castTable");

    let movieImage = data['poster'];
    let movieName = data['title'];
    let movieYear = data['year'];
    let movieRating = data['rating'];
    let movieRuntime = data['length'];
    let movieVotes = data['rating_votes'];
    let cast = data['cast']

    image.src = movieImage;
    movieInfo.innerHTML = `                    
    <h2> ${movieName} (${movieYear})  </h2>
    <h3> Rating : ${movieRating} / 10 </h3>
    <h4> Runtime : ${movieRuntime} mins</h4>
    <h4> Number of Votes  : ${movieVotes} </h4> `

    

  
    
    for(let i = 0; i < cast.length; i++) {
        let actor = cast[i];
        let actorName = actor['actor'];
        let actorId = actor['actor_id'];
        actorImagePromise = getActorImagePromise(actorName);
        actorImagePromise.then(response => response.json().then(
            function(data){
                for (let i = 0 ; i < data['names'].length; i++ ){
                    currentActor = data['names'][i];
                    if( actorId == currentActor['id'] ){
                        actorImage = currentActor['image'];
                        addOneRow(table , actorImage , actorName , actorId );
                    }
                }
             }
        ))

    }

}

function getActorImagePromise(name){

    return fetch(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${name}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "772da9c3f4msh660e5690bff9be7p1a3805jsnd4ec8e88c144",
		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
	}
    })
}

function addOneRow(table, imageUrl, actorName , actorId ){

    let newHtml =        
    `   <tr id="aaa">
            <td>
                <img src="${imageUrl}" height="60" width="47"/> 
            </td>

            <td>
                 <a href="celeb.html?id=${actorId}"> ${actorName} </a>
            </td>

            </tr>
        `;
    table.insertAdjacentHTML( 'beforeend', newHtml );


}





window.addEventListener("load",loadMovieContent);