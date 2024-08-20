// Express - это веб-фреймворк маршрутизации и промежуточной обработки с минимальной собственной функциональностью: 
// приложение Express, по сути, представляет собой серию вызовов функций промежуточной обработки.


// -- все роуты с api

import { Router } from 'express'
const router = Router()

//import { single } from 'multer'

import store from 'routes/books'
import Book from 'routes/books'

router.get('/api/books', (req, res) => {
    res.status(200).json(store)
});

router.get('/api/books/:id', (req, res) => {
    const {store} = store;
    const {id} = req.params
    const idx = store.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(store[idx])
    } else {
        res.status(404).json('404 | страница не найдена')
    }

});

router.post('/api/books', single('book-file'), (req, res) => {
    const {store} = store;
    let fileBook = "";
    if(req.file){
        const { path } = req.file
        fileBook = path;
    }

    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    console.log(fileBook)

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    store.push(newBook)

    res.status(201).json(newBook)
    
});

router.put('/api/books/:id', (req, res) => {
    const {store} = store;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const {id} = req.params
    const idx = store.findIndex(el => el.id === id)

    if (idx !== -1){
        store[idx] = {
            ...store[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook, 
        }

        res.json(store[idx])
    } else {
        res.status(404).json('404 | страница не найдена')
    }
});

router.delete('/api/books/:id', (req, res) => {
    const {store} = store;
    const {id} = req.params;
    const idx = store.findIndex(el => el.id === id)
     
    if(idx !== -1){
        store.splice(idx, 1)
        res.status(204).json("204 | книга удалена")
    } else {
        res.status(404).json('404 | страница не найдена')
    }
});

router.get('/api/books/:id/download', (req, res) => {
    const {store} = store;
    const {id} = req.params;
    const book = store.find(el => el.id === id)
    if(book === undefined){
        res.status(404).json('404 | страница не найдена')
    } 
    res.download(book.fileBook, book.id, err => {
        if (err)
            res.status(404).json('404 | страница не найдена');
    });
    
});

export default router
