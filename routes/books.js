const express = require('express');
const router = express.Router();

//const Book = require('../classes/Book')
//const store = require('../store/index')

const { v4: uuid } = require('uuid');

class Book {
    constructor(title = "", description = "", authors = "") {
        this.id = uuid()
        this.title = title
        this.description = description
        this.authors = authors
    }
}

const store = {
    books: []
};

[1, 2, 3].map(el => {
    const newBook = new Book(`book ${el}`, `description ${el}`, `authors ${el}`);
    store.books.push(newBook);
});

// [1, 2, 3].map(el => {
//     const newBook = new Book(`book ${el}`, `description ${el}`, `authors ${el}`, `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`, `fileBook ${el}`);
//     store.books.push(newBook);
// });

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
    const {title, description, authors} = req.body;

    const newBook = new Book(title, description, authors);
    books.push(newBook);

    res.redirect('/books')
});

// router.post('/create', (req, res) => {
//     const {books} = store;
//     const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;

//     const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
//     books.push(newBook);

//     res.redirect('/books')
// });

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
    const {title, description, authors} = req.body;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    books[idx] = {
        ...books[idx],
        title,
        description,
        authors, 
    };
    res.redirect(`/books/${id}`);
});

// router.post('/update/:id', (req, res) => {
//     const {books} = store;
//     const {id} = req.params;
//     const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
//     const idx = books.findIndex(el => el.id === id);

//     if (idx === -1) {
//         res.redirect('/404');
//     } 

//     books[idx] = {
//         ...books[idx],
//         title,
//         description,
//         authors, 
//         favorite, 
//         fileCover, 
//         fileName, 
//         fileBook,
//     };
//     res.redirect(`/books/${id}`);
// });

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