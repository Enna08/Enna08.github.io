var toBeEdited = false;
var modified = false;
var isHidden = false;
var noteToBeEdited;
const saveReturnButton = document.getElementById('saveReturn');
const noteTitle = document.getElementById('noteTitle');
const noteDescription = document.getElementById('noteDescription');

function createAndSaveNote( content ){
    var newNote = new Note( content );
    var noteObject = newNote.generateNote();
    storeNote( noteObject );
}

function editAndUpdateNote() {
    var editedNote = noteToBeEdited;
    editedNote.title = noteTitle.value;
    editedNote.description = noteDescription.value;
    editedNote.lastEdit = new Date().getTime();
    updateNote( editedNote, isHidden );
}

document.addEventListener("DOMContentLoaded", function(){
    var queryString = decodeURIComponent( location.search.substring(1) );
    queryString = queryString.split("&");
    console.log("EDIT CREATE INSIDE "+ queryString );
    isHidden = ( queryString.length == 2 ) ? true : false ;
    console.log("isHIdden - "+ isHidden);
    var noteJson = queryString[0];
    console.log( "hidden note "+ noteJson );
    if( noteJson.length > 0 ){
        toBeEdited = true; 
        noteToBeEdited = JSON.parse( noteJson );
        noteTitle.value = noteToBeEdited.title;
        noteDescription.value = noteToBeEdited.description;
    }
});

noteTitle.addEventListener( "input", function(){
    modified = true;
});

noteDescription.addEventListener( "input", function(){
    modified = true;
});

saveReturnButton.addEventListener( "click", function(){
    if( noteTitle.value.length>0 && noteDescription.value.length>0 ){
        if( toBeEdited && modified ){
            editAndUpdateNote();
        }else if( !toBeEdited ){
            createAndSaveNote( { title: noteTitle.value, description: noteDescription.value } );
        }
    }
    if( isHidden ){
        console.log("HIDDEN");
        console.log("HIDDEN");

        console.log("HIDDEN");

        console.log("HIDDEN");

        console.log("HIDDEN");

        console.log("HIDDEN");

        console.log("HIDDEN");

        console.log("HIDDEN");

        console.log("HIDDEN");

        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");
        console.log("HIDDEN");

        window.location.href = "./hidden.html";
    }
    else{
        window.location.href = "./index.html";
    }
});