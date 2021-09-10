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
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for index.html page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// GET route using DB.JSON file
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname,"./db/db.json" ));
});

// Creating POST route- takes JSON input, "title" "text" and adds a new note object to the db.json file
app.post("/api/notes", (req, res) => {
  const note = req.body;
  const noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const noteArr = (noteList.length).toString();
      noteList.push(note);
      fs.writeFile( "./db/db.json", JSON.stringify(noteList, null, 2), function(err) {
        if (err) throw err;
      })
      res.json(note);
      
  });

// Creates DELETE function
app.delete("/api/notes/:id", function(req, res) {
  const delNote = req.params.id;
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
      const notes = JSON.parse(data);
      const delArray = notes.filter(item => {
          return item.id !== delNote
      });
      fs.writeFile('./db/db.json', JSON.stringify(delArray), (err, data) => {
          res.json(delArray) 

      });
  });

});


// // // Wildcard route to direct users to a 404 page
// // app.get('*', (req, res) =>
// //   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// // );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
