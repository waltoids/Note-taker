const path = require('path');
const fs = require('fs');

module.exports = function(app) {
    app.get('/api/notes', function(req, res) {
        try {
           const db_response = fs.readFileSync('../db/db.json', 'utf8');

           return res.json(JSON.parse(db_response));
        }catch (error) {
            console.error(error);
            return res.status(500);
        }

    });

    app.post('/api/notes', function(req, res) {
        const { body } = req;

        try {
            const db_response = fs.readFileSync('../db/db.json', 'utf8');
            const notes = JSON.parse(db_response);

            body.id = notes.length;
            notes.push(body);

            fs.writeFileSync('../db/db.json', JSON.stringify(notes));

            return res.json(notes);
        }catch(error) {
            console.error(error);
            return res.status(500);
        }
    });

    app.delete('/api/notes/:id', function(req, res) {
        const { id } = req.params;
        try {
            const db_response = fs.readFileSync('../db/db.json', 'utf8');

            const notes = JSON.parse(db_response);
            const filterNotes = notes.filter(function(note) {
                if (note.id !==id) return note;
            });

            fs.writeFileSync('../db/db.json', JSON.stringify(filterNotes));

            return res.json(filterNotes);

        }catch(error) {
            console.error(error);
            return res.status(500);
        }
    });
};