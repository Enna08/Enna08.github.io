var noteArray = localStorage.getItem('notes')
  ? JSON.parse(localStorage.getItem('notes'))
  : [];

var uuid = localStorage.getItem('uuid')
  ? JSON.parse(localStorage.getItem('uuid'))
  : 0;

var hiddenNoteArray = localStorage.getItem('hiddenNotes')
? JSON.parse(localStorage.getItem('hiddenNotes'))
: [];

function setUuid(){
  localStorage.setItem('uuid', JSON.stringify(uuid));
}

function storeNote( note ){
  noteArray.push( note );
  localStorage.setItem('notes', JSON.stringify(noteArray));
}

function findAndDeleteNoteInArray( note, array ){
  var targetNoteIndex = array.findIndex( arrayNote => arrayNote.uuid == note.uuid );
  array.splice( targetNoteIndex, 1 );
}
    
function updateNote( note, isHidden ){
  if( isHidden ){
    findAndDeleteNoteInArray( note, hiddenNoteArray );
    hiddenNoteArray.push( note ); 
    localStorage.setItem('hiddenNotes', JSON.stringify(hiddenNoteArray));
  }else{
    findAndDeleteNoteInArray( note, noteArray );
    noteArray.push( note ); 
    localStorage.setItem('notes', JSON.stringify(noteArray));
  }
}  

function deleteNoteFromStorage( note ){
  findAndDeleteNoteInArray( note, noteArray );
  localStorage.setItem('notes', JSON.stringify(noteArray));
}

function hideNoteInStorage( note ){
  findAndDeleteNoteInArray( note, noteArray );
  hiddenNoteArray.push( note );
  localStorage.setItem('notes', JSON.stringify(noteArray));
  localStorage.setItem('hiddenNotes', JSON.stringify(hiddenNoteArray));
}

function unhideNoteInStorage( note ){
  findAndDeleteNoteInArray( note, hiddenNoteArray );
  noteArray.push( note );
  localStorage.setItem('notes', JSON.stringify(noteArray));
  localStorage.setItem('hiddenNotes', JSON.stringify(hiddenNoteArray));
}
  

  





