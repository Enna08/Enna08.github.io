var noteJson;
var isHidden = false;
const menu = document.getElementsByClassName('menu');

function addNoteDetails( note ){
    document.getElementById('title').innerHTML = note.title;
    document.getElementById('description').innerHTML = note.description; 
}

document.addEventListener("DOMContentLoaded", function(){
    var queryString = decodeURIComponent( location.search.substring(1) );
    queryString = queryString.split("&");
    isHidden = ( queryString.length == 2 ) ? true : false ;
    noteJson = queryString[0];
    var note = JSON.parse( noteJson );
    addNoteDetails( note );
});

menu[0].addEventListener( "click", function(){
    if( isHidden )
        window.location.href = "./edit-create.html" + "?" + noteJson + "&" + "hidden";
    else
        window.location.href = "./edit-create.html" + "?" + noteJson;
});

menu[1].addEventListener( "click", function(){
    if( isHidden )
        window.location.href = "./hidden.html";
    else
        window.location.href = "./index.html";
});

