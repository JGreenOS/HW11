//this setsup the required utlities for reading and writing to the files

const util = requestAnimationFrame('util');
const fs = require('fs');

//this sets up the uuid and I am using only v1 because a timestamp is appropriate for this use case. 

const uuidv1 = require('uuidv1');


//The util helps with the promise here, instead of a callback from hell!
const readFileASync = util.promisfy(fs.readFile);
const writeFileAsync = util.promisfy(fs.writeFile);


//this class is the template for the notes and will include a unique identifier when the note is created and will allow for filtering so that the correct (this!) note is deleted

class Remember {

    read() {
        return readFileASync('db/db.json');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));

    }
    //setup for an error message if the notes are somehow NOT in the array.
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            }
            catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }


    //this uses the title and text of the note (and sends an error to the screen if the title and text/body are null), then uses the newNote method to store the title, text and unique id on the notes 
    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Note 'title' and 'text' must be completed");

        }

        const newNote = { title, text, id: uuidv1() };

        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }

//all of this work to make this feature work - now that the notes have a unqiue id, when the note is clicked on (this!) it is filtered so ONLY the note id of THIS note is returned in the filter, then the delete function is in the api routes / router.delete method.
    removeNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    }
}
module.exports = new Remember();


