const unhideButton = document.getElementById('unhide');
const confirmButton = document.getElementById('confirm');
const returnButton = document.getElementById('return');
const heading = document.getElementById('heading');

function enableDisableSelection( primaryColor, selectedColor ){
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

document.addEventListener("DOMContentLoaded", function(){
    menuPanel.style.justifyContent = "flex-start";
    unhideButton.style.marginBottom = "12px";
    confirmButton.style.marginBottom = "12px";
    hiddenNoteArray.forEach( renderNote, "hidden" );
});

unhideButton.addEventListener( "click", function(){
    unhideButton.style.display = "none";
    confirmButton.style.display = "block";
    heading.innerHTML = "Select Notes To Unhide";
    enableDisableSelection( "rgb(142, 0, 0)", "rgb(27, 94, 32)" );
});

confirmButton.addEventListener( "click", function(){
    const noteBoxDivs = document.getElementsByClassName('noteBox');
    var notesToBeUnhidden = [];
    for (const noteBoxDiv of noteBoxDivs) {
        if( (noteBoxDiv.style.borderColor).localeCompare( "rgb(27, 94, 32)" ) == 0 ){
            unhideNoteInStorage( JSON.parse(noteBoxDiv.id) );
            notesToBeUnhidden.push(noteBoxDiv);
        }
    }
    notesToBeUnhidden.forEach( note => note.remove() );
});

returnButton.addEventListener( "click", function(){
    if( unhideButton.style.display == "none" ){
        unhideButton.style.display = "block";
        confirmButton.style.display = "none";
        heading.innerHTML = "Hidden Notes";
        const noteBoxDivs = document.getElementsByClassName('noteBox');
        for (const noteBoxDiv of noteBoxDivs){ 
            noteBoxDiv.style.borderColor = "#560027";
            noteBoxDiv.onclick = function() {
                window.location.href = "./display.html" + "?" + noteBoxDiv.id + "&hidden";
            };
        }
    }
    else
        window.location.href = "./index.html";
})
