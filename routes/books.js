const express = require('express');
const router = express.Router();

//const Book = require('../classes/Book')
//const store = require('../store/index')

const { v4: uuid } = require('uuid');

class Book {
    constructor(
        title = "", 
        description = "", 
        authors = "", 
        favorite = "", 
        fileCover = "", 
        fileName = "",
        fileBook = "", 
        count = "") {
        this.id = uuid();
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
        this.count = count;
    }
}

const store = {
    books: []
};

[1, 2, 3].map(el => {
    const newBook = new Book(`title ${el}`, `description ${el}`, `authors ${el}`, `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`, `fileBook ${el}`, `count ${el}`);
    store.books.push(newBook);
});

router.get('/', (req, res) => {
    const {books} = store;
    res.render("books/index", {
        title: "Books",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Book | create",
        books: {},
    });
});

router.post('/create', (req, res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName, fileBook, count} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook, count);
    books.push(newBook);

    res.redirect('/books')
});

router.get('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 
        
    res.render("books/view", {
        title: "Book | view",
        books: books[idx],
    });
    
});

router.get('/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    res.render("books/update", {
        title: "Book | view",
        books: books[idx],
    });
});

router.post('/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName, fileBook, count} = req.body;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    books[idx] = {
        ...books[idx],
        title,
        description,
        authors, 
        favorite, 
        fileCover, 
        fileName, 
        fileBook, 
        count
    };
    res.redirect(`/books/${id}`);
});

router.post('/delete/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    books.splice(idx, 1);
    res.redirect(`/books`);
});





module.exports = router;