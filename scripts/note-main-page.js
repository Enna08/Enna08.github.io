const createButton = document.getElementById('create');
const hideButton = document.getElementById('hide');
const deleteButton = document.getElementById('delete');
const hiddenNotesButton = document.getElementById('hiddenNotes');
const confirmButton = document.getElementById('confirm');
const returnButton = document.getElementById('return');
const heading = document.getElementById('heading');
const filterSortBar = document.getElementById('filterSortBar');
const filterSortElements = document.getElementsByClassName('filterSort');
const menuPanel = document.getElementById('menuPanel');

function filterNote(){
    var input = filterSortElements[0].value.toUpperCase();
    const noteBoxDivs = document.getElementsByClassName('noteBox');
    for (const noteBoxDiv of noteBoxDivs) {
        var noteContent = noteBoxDiv.children;
        var title = noteContent[0].textContent || noteContent[0].innerText;
        if( title.toUpperCase().startsWith( input ) )
            noteBoxDiv.style.display = "";
        else
            noteBoxDiv.style.display = "none";
    }
}

function checkAlphabetically(noteBoxDivs, index){
    var firstNote = noteBoxDivs[index].children[0].textContent.toUpperCase();
    var secondNote = noteBoxDivs[index+1].children[0].textContent.toUpperCase();
    return (firstNote > secondNote);
}

function checkByLastEdit(noteBoxDivs, index){
    var firstNote = JSON.parse( noteBoxDivs[index].id );
    var secondNote = JSON.parse( noteBoxDivs[index+1].id );
    return ( firstNote.lastEdit < secondNote.lastEdit );
}

function checkSwitch(val, noteBoxDivs, index){
    if( val == "alphabetically" )
        return checkAlphabetically(noteBoxDivs, index);
    else
        return checkByLastEdit(noteBoxDivs, index);
}

function sort( val ){
    var switching = true;
    while( switching ){
        switching = false;
        const noteBoxDivs = document.getElementsByClassName('noteBox');
        var index = 0, shouldSwitch = false;
        for (const noteBoxDiv of noteBoxDivs){
            if( (index+1 != noteBoxDivs.length) && checkSwitch(val, noteBoxDivs, index) ){
                shouldSwitch = true;
                break;
            }
            index++;
        }
        if( shouldSwitch ){
            noteBoxDivs[index].parentNode.insertBefore(noteBoxDivs[index + 1], noteBoxDivs[index]);
            switching = true;
        } 
    }
}

function setUpDeleteOrHideView( primaryColor, selectedColor){
    createButton.style.display = "none";
    hideButton.style.display = "none";
    deleteButton.style.display = "none";
    console.log("confirm button - "+ confirmButton.style.display);
    confirmButton.style.display = "block";
    console.log(" AFTER confirm button - "+ confirmButton.style.display);
    returnButton.style.display = "block";
    const noteBoxDivs = document.getElementsByClassName('noteBox');
    for (const noteBoxDiv of noteBoxDivs) {
        noteBoxDiv.style.borderColor = primaryColor;
        noteBoxDiv.onclick = function() {
            if( (noteBoxDiv.style.borderColor).localeCompare( primaryColor ) == 0 ){
                noteBoxDiv.style.borderColor = selectedColor;
            }
            else{
                noteBoxDiv.style.borderColor = primaryColor;
            }
        };
    }
}

function setUpOriginalDisplay(){
    createButton.style.display = "block";
    hideButton.style.display = "block";
    deleteButton.style.display = "block";
    confirmButton.style.display = "none";
    returnButton.style.display = "none";
    hiddenNotesButton.style.display = "none";
    heading.innerHTML = "Take notes & never forget";
    menuPanel.style.justifyContent = "space-between";
    const noteBoxDivs = document.getElementsByClassName('noteBox');
    for (const noteBoxDiv of noteBoxDivs){ 
        noteBoxDiv.style.borderColor = "#560027";
        noteBoxDiv.onclick = function() {
            window.location.href = "./display.html" + "?" + noteBoxDiv.id;
        };
    }
}

function deleteNotes(){
    const noteBoxDivs = document.getElementsByClassName('noteBox');
    var notesToBeDeleted = [];
    for (const noteBoxDiv of noteBoxDivs) {
        if( (noteBoxDiv.style.borderColor).localeCompare( "rgb(27, 94, 32)" ) == 0 ){
            deleteNoteFromStorage( JSON.parse(noteBoxDiv.id) );
            notesToBeDeleted.push(noteBoxDiv);
        }
    }
    notesToBeDeleted.forEach( note => note.remove() );
}

function hideNotes(){
    const noteBoxDivs = document.getElementsByClassName('noteBox');
    var notesToBeHidden = [];
    for (const noteBoxDiv of noteBoxDivs) {
        if( (noteBoxDiv.style.borderColor).localeCompare( "rgb(27, 94, 32)" ) == 0 ){
            hideNoteInStorage( JSON.parse(noteBoxDiv.id) );
            notesToBeHidden.push(noteBoxDiv);
        }
    }
    notesToBeHidden.forEach( note => note.remove() );
}

document.addEventListener("DOMContentLoaded", function(){
    noteArray.forEach( renderNote );
});

createButton.addEventListener( "click", function(){   
    window.location.href = "./edit-create.html";
});

hideButton.addEventListener( "click", function(){
    setUpDeleteOrHideView( "rgb(142, 0, 0)", "rgb(27, 94, 32)" );
    hiddenNotesButton.style.display = "block";
    heading.innerHTML = "Select Notes To Hide";
});

deleteButton.addEventListener( "click", function(){ 
    setUpDeleteOrHideView( "rgb(142, 0, 0)", "rgb(27, 94, 32)" );
    menuPanel.style.justifyContent = "flex-start";
    confirmButton.style.marginBottom = "12px";
    heading.innerHTML = "Select Notes To Delete";
});

hiddenNotesButton.addEventListener( "click", function(){
    window.location.href = "./hidden.html";
});

confirmButton.addEventListener( "click", function(){
    if( hiddenNotesButton.style.display == "none" )
        deleteNotes();
    else
        hideNotes();
});

returnButton.addEventListener( "click", function(){
    setUpOriginalDisplay();
});






