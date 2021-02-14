let scriptDependencies = {
    "index" : ["scripts/LoadMainPage.js", "scripts/TabsHandler.js"],
    "movie" : ["scripts/LoadMovie.js"],
    "celeb" : ["scripts/LoadCeleb.js"],
    "search" : ["scripts/LoadSearchPage.js"]


}

function setUpRouter(){
    var root = "/";
    var router = new Navigo(root, {hash : true});

    router.on((match) => {
        
        loadAndRenderData("/index")
      })
      .on("/movie", (match) => {
        loadAndRenderData("/movie")
      })
      .on("/celeb", () => {
        loadAndRenderData("/celeb")
      })
      .on("/search" , (match) => {
        loadAndRenderData("/search")
      })
      .on("/index" ,() => {
        loadAndRenderData("/index")
      })
    
    .resolve();
}

function loadAndRenderData(link){
    fetch(link+".html").then(response => response.text().then(function (html) {

        var parser = new DOMParser();
	    var newDoc = parser.parseFromString(html, 'text/html');
        let newContent = newDoc.querySelector("#content")
        document.querySelector("#content").innerHTML = newContent.innerHTML
        loadSctipts(link)

    } ))
}

function loadSctipts(link){
    link = link.substring(1)
    let scriptsToLoad = scriptDependencies[link];
    scriptsToLoad.forEach(scriptLink => {
        fetch(scriptLink).then(response => response.text().then(function(code){
            eval(code)


        }))
        
    });
        
}
    
 





window.addEventListener("load", setUpRouter)