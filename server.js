const express = require('express');
const path = require('path');
const uuid = require("uuid");
const PORT = process.env.PORT || 3001;
const fs = require("fs");

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// GET Route
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for index.html page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// GET route using DB.JSON file
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname,"./db/db.json" ))
);

// GET route using DB.JSON file
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname,"./db/db.json" ))
);

app.post("/api/notes", (req, res) => {
  const createNote = req.body;
  const noteArr = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  createNote.id =  uuid.v4();

  noteArr.push(createNote);
  res.json(noteArr);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteArr));
 
})

//delete
app.delete("/api/notes/:id", function(req, res) {
  const remNote = req.params.id;
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
      const notes = JSON.parse(data);
      const notesArray = notes.filter(delNote => {
          return delNote.id !== remNote
      });
      fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err, data) => {
          res.json(notesArray) 

      });
  });

});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
