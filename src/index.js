const express = require('express')

const app = express()

require("body-parser")
require('mongoose')

//src/classes
const booksContainer = require('./classes/books_container');
const booksRepository = require('./classes/books-repository')

//src/db
const connectionDb = require('./db/connection.js')

//src/models
const bookModels = require('./models/book.ts')
const books_repModels = require('./models/books_repository.ts')

//src/multer
const errorMulter = require('./multer/error-404.js')
const indexMulter = require('./multer/index.js')
const loggerMulter = require('./multer/logger.js')

//src/router
const indexRouter = require('./router/index')

//src/routes
const booksRoutes = require('./routes/books.js')
const indexRoutes = require('./routes/index.js')

app.use(express.urlencoded( {extended: false}));
app.set("view engine", "ejs");

app.use(express.json())

app.use(booksContainer)
app.use(booksRepository)

app.use(connectionDb)

app.use(bookModels)
app.use(books_repModels)

app.use(errorMulter);
app.use(indexMulter)
app.use(loggerMulter)

//app.use(indexRouter)

app.use('/', indexRoutes);
app.use('/books', booksRoutes);

// app.use('/public', express.static(__dirname+'/public'))
app.use('/api', indexRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('500 | Ошибка сервера')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
    console.log('Started!')
});

