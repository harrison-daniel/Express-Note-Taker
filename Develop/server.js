const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json')

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

// --- Initialize our app variable by setting it to the value of express()
const app = express();

const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutess');
const htmlRoutes = require('./routes/htmlRoutes');


 // Use routes
 app.use('/', apiRoutes);
 app.use('/', htmlRoutes);

 app.get('./db/db.json', (req, res) => {
   res.send('Hello');
 })

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});


