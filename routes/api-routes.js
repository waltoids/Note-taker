const path = require('path');
const fs = require('fs').promises;

module.exports = function(app) {
    const DATA_PATH = path.join(process.cwd(), 'db', 'db.json');

    app.get('/api/notes', async function(req, res) {
        try {
           const db_response = await fs.readFile(DATA_PATH, 'utf8');

           return res.json(JSON.parse(db_response));
        }catch (error) {
            console.error(error);
            return res.status(500);
        }

    });

    app.post('/api/notes', async function(req, res) {
        const { body } = req;

        try {
            const db_response = await fs.readFile(DATA_PATH, 'utf8');
            const notes = JSON.parse(db_response);

            body.id = notes.length;
            notes.push(body);

            await fs.writeFile(DATA_PATH, JSON.stringify(notes));

            return res.json(notes);
            
        }catch(error) {
            console.error(error);
            return res.status(500);
        }
    });

    app.delete('/api/notes/:id', async function(req, res) {
        
        try {
            const db_response = await fs.readFile(DATA_PATH, 'utf8');

            const notes = JSON.parse(db_response);
            const filterNotes = notes.filter(function(note) {
                return note.id != req.params.id;
            });

            await fs.writeFile(DATA_PATH, JSON.stringify(filterNotes));

            return res.json(filterNotes);

        }catch(error) {
            console.error(error);
            return res.status(500);
        }
    });
};