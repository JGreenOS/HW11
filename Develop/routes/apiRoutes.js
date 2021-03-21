//create variables for the router functions in express and calls the uniqueid file which helps with creating a unique id on each note

const router = require('express').Router();
const remember= require("../db/uniqueid")

//router.get will find the notes and render in the response.  If the response is no good, it will return a 500 (no server) error
router.get('/notes', (req, res) => {
    remember
        .getNotes()
        .then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

//router.post will write the notes and display on the user screen

router.post('/notes', (req, res) => {

    remember
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});


//now that we have a unique id, this is the function to delete a note.  id is defined in the uniqueid.js file.  Router.delete handles this in it's methods.

router.delete('/notes/:id', (req, res) => {
remember
.removeNote(req.params.id)
.then(() => res.json( {ok:true}))
.catch((err) => res.status(500).json(err));


});


module.exports = router;
