handleSearchButtonClick = function(){
    let logo = document.querySelector("#logo");
    let searchFormHiddenButton = document.querySelector("#searchFormHiddenButton");
    let searchFormHidden =  document.querySelector("#searchFormHidden");

    logo.style.display = 'none'
    searchFormHiddenButton.style.display = 'none'
    searchFormHidden.style.display = 'block'

}

handelCloseButtonClick = function(){
    let logo = document.querySelector("#logo");
    let searchFormHiddenButton = document.querySelector("#searchFormHiddenButton");
    let searchFormHidden =  document.querySelector("#searchFormHidden");

    logo.style.display = 'block'
    searchFormHiddenButton.style.display = 'block'
    searchFormHidden.style.display = 'none'



}


handleResponsiveSearch = function () {
    let closeButton = document.querySelector('#hiddenSearchCloseButton');
    let searchButton = document.querySelector('#hiddenSearchButtonImage');

    searchButton.addEventListener('click', handleSearchButtonClick );
    closeButton.addEventListener('click', handelCloseButtonClick );


    
}




window.onload=handleResponsiveSearch;