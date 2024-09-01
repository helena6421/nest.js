// Book, store и все роуты 

import { Router } from 'express';
const router = Router();

import { v4 as uuid } from 'uuid';

class Book {
    constructor(
        title = "", 
        description = "", 
        authors = "", 
        favorite = "", 
        fileCover = "", 
        fileName = "",
        fileBook = "", ) {
        this.id = uuid();
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
    }
}

const store = [];

[1, 2, 3].map(el => {
    const newBook = new Book(`title ${el}`, `description ${el}`, `authors ${el}`, 
        `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`, `fileBook ${el}`);
    store.push(newBook);
});

router.get('/', (req, res) => {
    try {
    const {store} = store;
    res.render("books/index", {
        title: "Books",
        books: store,
    })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Book | create",
        Book: {
            title: '',
            description: '',
            authors: '',
            favorite: '', 
            fileCover: '', 
            fileName: '', 
            fileBook: '', 
        },
    });
});

router.post('/create', async (req, res) => {
    const {store} = store;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    store.push(newBook);

    try {
        await newBook.save();
        res.redirect(`/books`);
    } catch (error) {
        console.error('Error:', error);
        res.redirect('/404');
    }
});

router.get('/:id', (req, res) => {
    const {store} = store;
    const {id} = req.params;
    const idx = store.findIndex(el => el.id === id);

    if (idx === -1) {
        console.error('Error:', error);
        res.redirect('/404');
    } 
        
    res.render("books/view", {
        title: "Book | view",
        books: store[idx],
    });
    
});

router.get('/update/:id', (req, res) => {
    const {store} = store;
    const {id} = req.params;
    const idx = store.findIndex(el => el.id === id);

    if (idx === -1) {
        console.error('Error:', error);
        res.redirect('/404');
    } 

    res.render("books/update", {
        title: "Book | view",
        books: store[idx],
        book:{
            title: store[idx].title ?? '',
            description: store[idx].description ?? ''
        }
    });
});

router.post('/update/:id', (req, res) => {
    const {store} = store;
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const idx = store.findIndex(el => el.id === id);

    if (idx === -1) {
        console.error('Error:', error);
        res.redirect('/404');
    } 
    try {
    store[idx] = {
        ...store[idx],
        title,
        description,
        authors, 
        favorite, 
        fileCover, 
        fileName, 
        fileBook,
    };
    res.redirect(`/books/${id}`);
    } catch (error) {
        console.error('Error:', error);
        res.redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {store} = store;
    const {id} = req.params;
    const idx = store.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    store.splice(idx, 1);
    res.redirect(`/books`);
});

export default router; Book; store;