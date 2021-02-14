handleSearchButtonClick = function(){
    let logo = document.querySelector("#logo");
    let searchFormHiddenButton = document.querySelector("#searchFormHiddenButton");
    let searchFormHidden =  document.querySelector("#searchFormHidden");
    let menuHeader = document.querySelector('#hiddenMenuHeader');
    let menu = document.querySelector('#hiddenMenu');

    logo.style.display = 'none'
    searchFormHiddenButton.style.display = 'none'
    searchFormHidden.style.display = 'block'
    menuHeader.style.display = 'none';
    menu.style.display = 'none';

}
handelCloseButtonClick = function(){
    let logo = document.querySelector("#logo");
    let searchFormHiddenButton = document.querySelector("#searchFormHiddenButton");
    let searchFormHidden =  document.querySelector("#searchFormHidden");
    let menuHeader = document.querySelector('#hiddenMenuHeader');
    let menu = document.querySelector('#hiddenMenu');

    logo.style.display = 'block';
    searchFormHiddenButton.style.display = 'block';
    searchFormHidden.style.display = 'none';
    menuHeader.style.display = 'flex';
    menu.style.display = 'none';

}


handleResponsiveSearch = function () {
    let closeButton = document.querySelector('#hiddenSearchCloseButton');
    let searchButton = document.querySelector('#hiddenSearchButtonImage');

    searchButton.addEventListener('click', handleSearchButtonClick );
    closeButton.addEventListener('click', handelCloseButtonClick );


    
}

handleResponsiveMenu = function (){
    let menuHeader = document.querySelector('#hiddenMenuHeader');
    let menu = document.querySelector('#hiddenMenu');
    menuHeader.addEventListener('click',function (){
        if(menu.style.display === "block"){
            menu.style.display = 'none';
        }else{
            menu.style.display = "block";
        }
        
    } )

    
    window.addEventListener("hashchange" , function(){
        menu.style.display = 'none';
    })

}

handleResponsive=function(){
    handleResponsiveSearch();
    handleResponsiveMenu();
}




window.addEventListener("load",handleResponsive)