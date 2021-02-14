const MAX_SEARCH_RESULTS = 5;



function handlePageLoad(){

    searchKeyWord = getSearchKeyWord();
    loadData(searchKeyWord);


}

function getSearchKeyWord(){
    
    var href = window.location.href;
    var index = href.lastIndexOf("?")
    let queryString = href.substring(index)
    const urlParams = new URLSearchParams(queryString); 

    return urlParams.get("q");  
}

function loadData(searchKeyWord){
    if (searchKeyWord == "" )
        return;
    
     fetch(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${searchKeyWord}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "772da9c3f4msh660e5690bff9be7p1a3805jsnd4ec8e88c144",
		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
	}
    })
    .then(response => {
        response.json().then(function(data) {
            renderData(data)
            
        } );
	    
    })
    .catch(err => {
	    console.error(err);
    });

}

function renderData(data){
    let namesTable = document.querySelector("#NamesResults>table");
    let titlesTable = document.querySelector("#TiTlesResults>table");
    addDataToTable(data['names'] ,  namesTable);
    addDataToTable(data['titles'],  titlesTable);



}

function addDataToTable(data ,  table){
    if( data.length == 0 ){
        table.style.display = "none";
        return;
    }
    
    for( let i = 0 ; i < data.length; i++) {
        if (i == MAX_SEARCH_RESULTS)
            return;
        let currentData = data[i];
        let resultImage = currentData['image'];
        let resultTitle = currentData['title'];
        let resultId = currentData['id'];
        addOneItemToTable(table , resultImage , resultTitle , resultId);
        
    }
    

}

function addOneItemToTable(table, resultImage , resultTitle , resultId){
    let forwardPage = "/#movie";
    if(resultId[0] != "t"){
        forwardPage= "/#celeb";
    }
  
    let newHtml =        
    `   <tr >
            <td>
            <img src=${resultImage} width="60" height="80" > 
            </td>

            <td>
            <a href ="${forwardPage}?id=${resultId}"> ${resultTitle}</a>  
            </td>

            </tr>
        `;
    
    table.insertAdjacentHTML( 'beforeend', newHtml );



}



 handlePageLoad();