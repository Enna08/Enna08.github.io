class Note{
    constructor( content ){
        this.generateUuid();
        this.generateCreationDateTime();
        this.title = content.title;
        this.description = content.description;
    }

    generateUuid(){
        var idPrefix = "note";
        this.uuid = idPrefix + uuid++;
        setUuid();
    }

    generateCreationDateTime(){ 
        this.lastEdit = new Date().getTime();
    }

    generateNote(){
        var note = {
            uuid: this.uuid,
            title: this.title,
            description: this.description,
            lastEdit: this.lastEdit
        }
        return note;
    }
}

