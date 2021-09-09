const express = require('express');
const path = require('path');
const PORT = process.env.port || 3001;
const fs = require("fs");

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for index.html page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// GET route using DB.JSON file
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "db.json"));
});

// Creating POST route- takes JSON input, "title" "text" and adds a new note object to the db.json file
app.post("/api/notes", (req, res) => {
  const note = req.body;
  const noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const notelength = (noteList.length).toString();
      notes.push(note);
      res.json(note);
      fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(notes, null, 2), function(err) {
          if (err) throw err;
      });
  });

// Creates DELETE function- deleting the note object with the id from the DB.JSON FILE
app.delete('/notes/:id', (req, res) => {
  deleteNote(notes, req.params.id);
  res.json(notes);
})

// // Wildcard route to direct users to a 404 page
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
