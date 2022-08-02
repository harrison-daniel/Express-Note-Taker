// Import express package
const express = require('express');
const path = require('path');
const fs = require('fs');

// Require the JSON file and assign it to a variable called notesData
const notesData = require('./db/db.json');
//  const { getNotes, saveNote, renderActiveNote } = require('./public/assets/js/index');
const { stringify } = require('querystring');
const { text } = require('body-parser');

//  method for generating unique ids
const uuidv4  = require('./helpers/uuid');

// const PORT = process.env.PORT || 3001;
const PORT = 3001;

// --- Initialize our app variable by setting it to the value of express()
const app = express();

app.use(express.json());
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));




app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));

   // Log our request to the terminal
   console.info(`${req.method} request received to get notes`);
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/index.html'));
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
    // Log our request to the terminal
    console.info(`${req.method} request received to get note`);
});

app.post('/api/notes', (req, res) => {
     // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text ) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    // Obtain existing reviews
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});



app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});