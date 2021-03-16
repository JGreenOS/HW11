//create const variables for data source arrays
const router = require('express').Router();
const fs = require('fs');


///ROUTING

module.exports = (app) => {
//API get requests here


router.get("/notes", function(req, res) {

    fs.readFile("./db/db.json", "utf8", function(err, data){
//error code
if (err) throw err;
res.json(JSON.parse(data));
    });
});

}
