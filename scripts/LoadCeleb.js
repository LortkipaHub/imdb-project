const MAX_ELEM_TABLE = 50;


function loadCelebInfo(id){
    
    
    fetch(`https://imdb8.p.rapidapi.com/actors/get-bio?nconst=${id}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "772da9c3f4msh660e5690bff9be7p1a3805jsnd4ec8e88c144",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
        }
    })
    .then(response => {
        response.json().then(data => fillCelebInfoWithData(data));
    })
    .catch(err => {
	    console.error(err);
    });


}


function loadKnownFor(id){
    

    fetch(`https://imdb8.p.rapidapi.com/actors/get-all-filmography?nconst=${id}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "772da9c3f4msh660e5690bff9be7p1a3805jsnd4ec8e88c144",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	}
    })   
    .then(response => {
        response.json().then(data => fillTableWithData(data));
    })
    .catch(err => {
	    console.error(err);
    });

    
}

function loadDataOnPage(){

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString); 

    let id = urlParams.get('id');

    loadCelebInfo(id);
    loadKnownFor(id);

}


function fillCelebInfoWithData(data){
    let image = document.querySelector("#imageDiv>img");
    let celebInfo = document.querySelector("#celebInfo");
    
    
    let celebImage = data['image']['url'];
    let celebeName = data['name'];
    let celebBirthDay = data['birthDate'];
    let celebBirthPlace = data['birthPlace'];
    
    
    image.src = celebImage;
    celebInfo.innerHTML = `
     <h2> ${celebeName} </h2>
     <h4> Birth Date : ${celebBirthDay} </h4>
     <h4> Birth Place : ${celebBirthPlace} </h4> `
    
    
}

function fillTableWithData(data){

    let table = document.querySelector("#knownFor>tbody");
    let knownFor = data['filmography'];
    console.log(knownFor)
    for (let i = 0 ; i < knownFor.length; i++ ){

        if (i ==  MAX_ELEM_TABLE)
            return

        let currentMovie = knownFor[i]
        console.log(currentMovie);
        let movieImage = currentMovie['image'];
        let movieImageUrl;
        if (movieImage == undefined)
            movieImageUrl = "images/logo.jpg";
        else
            movieImageUrl = movieImage["url"];
        let movieName = currentMovie['title'];
        let movieYear = currentMovie['year'];
        if (movieYear ==  undefined)
            movieYear = "Coming Soon...";
        let titleString = "/title/";
        let movieId = currentMovie['id'].substring(titleString.length , currentMovie['id'].length - 1)
        

        addOneRow(table , movieImageUrl , movieName , movieYear , movieId );


    }




}


function addOneRow(table, imageUrl, movieName , movieYear, movieId ){

    let newHtml =        
    `   <tr>
            <td>
                <img src="${imageUrl}" height="60" width="47"/> 
            </td>

            <td>
                 <a href="celeb.html?id=${movieId}"> ${movieName} </a>
            </td>

            <td>
                 <a> ${movieYear} </a>
            </td>

            </tr>
        `;
    table.insertAdjacentHTML( 'beforeend', newHtml );


}





window.addEventListener("load",loadDataOnPage);