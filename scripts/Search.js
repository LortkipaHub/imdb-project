const MAX_EACH_SEARCH_RESULTS = 3;

function handleSearchSuggestions(){
    let searchTextField =  document.querySelector("#searchField");
    let responsiveSearchTextField = document.querySelector("#searchFieldHidden");

    searchTextField.addEventListener("click",showSuggestionBox);
    responsiveSearchTextField.addEventListener("click",showSuggestionBox);
    document.addEventListener("click", hideSuggestionBox);

    searchTextField.addEventListener("input", loadSearchResultInSuggestion);
    responsiveSearchTextField.addEventListener("input", loadSearchResultInSuggestion);

}

function showSuggestionBox(){
    let suggestionBox = document.querySelector("#suggestionBox");
    suggestionBox.style.display = "block";
}

function hideSuggestionBox(e){
    let suggestionBox = document.querySelector("#suggestionBox");
    let searchArea = document.querySelector("#searchArea");

    if (suggestionBox.style.display != "block")
        return
    if (searchArea.contains(e.target))
        return
    
    suggestionBox.style.display = "none";


}

function loadSearchResultInSuggestion(e){
    let target = e.target;
    text = target.value;
    let suggestionBox = document.querySelector("#suggestionBox>ul");
    suggestionBox.innerHTML = ""; 
    if(text == "")
        return;

    fetch(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${text}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "772da9c3f4msh660e5690bff9be7p1a3805jsnd4ec8e88c144",
		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
	}
    })
    .then(response => {
        response.json().then(function(data) {

            addDataToSuggestionBox(data['titles']);
            addDataToSuggestionBox(data['names']); 
        } );
	    
    })
    .catch(err => {
	    console.error(err);
    });


}

function addDataToSuggestionBox(data){
   
    
    for (let i=0; i < data.length; i++){
        if (i == MAX_EACH_SEARCH_RESULTS)
            return;
        let currentData = data[i];
        let resultImage = currentData['image'];
        let resultTitle = currentData['title'];
        let resultId = currentData['id']
        
        addOneItemToSuggestionBox(resultImage,resultTitle,resultId);
    }
    
    
    

}

function addOneItemToSuggestionBox(resultImage , resultTitle, resultId){
    let suggestionBox = document.querySelector("#suggestionBox>ul");
    let forwardPage = "movie.html";
    if(resultId[0] != "t"){
        forwardPage= "celeb.html";
    }
    let newHtml = `                    
    <li>
        <div class="suggestion">

            <div class="searchResultImage">
                <img src=${resultImage} width="60" height="80" > 
            </div>

            <div class='searchResultInfo'>
                <a href ="${forwardPage}?id=${resultId}"> ${resultTitle}</a>  
            </div>
          
        </div>

    </li>`

    suggestionBox.insertAdjacentHTML( 'beforeend', newHtml );

}





window.addEventListener("load", handleSearchSuggestions);