const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

//connect to mongodb
mongoose.connect("mongodb://localhost/myDatabase",{ useNewUrlParser: true , useUnifiedTopology: true })

const db = mongoose.connections;
db.concat("error", console.error.bind(console,"Mongodb connection error:"));
db.once("open",() => {
    console.log("connected to mongodb successfully");
});
// link to mongodb
//https://devsarticles.com/mongo-db-connection-with-express-js

app.get("/", (req, res) => {
  res.send('Hello World!');
});

let books = [];

app.use(express.json());

// Get All Books
app.get('/books', (req, res) => {
   // res.send("GET path is working fine");
   const book =  books.find(b => b.id === parseInt(req.params.id));
   if (!book) {
     return res.status(404).send('Book not found');
   }
  res.json(book);
  });

// Create a Book
app.post('/books', (req, res) => {
    res.send("POST request path is working")
    // Logic to add a book
    const { title, author }= req.body;
    if (!title || !author) {
        return res.status(400).send("missing title or author");
    }
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).send(newBook);
});

  // Get a Single Book
  app.get('/books/:id', (req, res) => {
    res.send("GET by id is working fine")
    // Logic to get a single book
  });
  
  // Update a Book
  app.put('/books/:id', (req, res) => {
    const book = books.fibd(b => b.id === parseInt( req.params.id));
    if(!book){
        return res.status(404).send("book not found");
    }
    const { title , author}= req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    res.send(book);
    // Logic to update a book
  });
  
  // Delete a Book
  app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex ===-1) {
        return res.status(404).send("book not found");
    }
    books.splice(bookIndex,1);
    res.status(204).send();
    // Logic to delete a book
  });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});