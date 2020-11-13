function getDifferenceInMinutes( dt1, dt2 ){
    var diff = ( dt1 - dt2 ) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

function convertMinutes( minutes ){
    if( Math.round((minutes/525600)) > 0 )
        return Math.round((minutes/525600)) + " years";
    else if( Math.round((minutes/43800)) > 0 ) 
        return Math.round((minutes/43800)) + " months";
    else if( Math.round((minutes/1440)) > 0 )
        return Math.round((minutes/1440)) + " days";
    else if( Math.round((minutes/60)) > 0 )
        return Math.round((minutes/60)) + " hours";
    else if( Math.round(minutes) > 0 )
        return Math.round(minutes) + " minutes";
    else
        return "few seconds";
}

function calcLastEdit( noteObject ){
    var currentTime = new Date().getTime();
    var minutes = getDifferenceInMinutes( currentTime, noteObject.lastEdit );
    var lastEdit = convertMinutes( minutes );
    return "Last edited " + lastEdit + " ago";
}

function renderNote( noteObject ){
    var noteBox = document.createElement("div");
    noteBox.className = "noteBox";
    noteBox.id = JSON.stringify( noteObject );
    var isHidden = ( this == "hidden" );
    noteBox.onclick = function(){
        if( isHidden ){
            window.location.href = "./display.html" + "?" + noteBox.id + "&hidden";
        }
        else
            window.location.href = "./display.html" + "?" + noteBox.id;
    };
    var titleBox = document.createElement("span");
    var titleText = document.createTextNode( noteObject.title );
    titleBox.appendChild( titleText );
    var lastEditBox = document.createElement("p");
    var lastEdit = calcLastEdit( noteObject );
    var lastEditText = document.createTextNode( lastEdit );
    lastEditBox.appendChild( lastEditText );
    noteBox.appendChild( titleBox );
    noteBox.appendChild( lastEditBox );
    filterSortBar.insertAdjacentElement( "afterend", noteBox );
}