import express = require('express')

const app = express()

require("body-parser")
require('mongoose')

import router = require('src/router/index')

import logger = require('./multer/logger')
import errorMulter = require('./multer/error-404')

import indexRoutes = require('./routes/index')
import booksRoutes = require('./routes/books')

app.use(express.urlencoded( {extended: false}));
app.set("view engine", "ejs");

app.use(express.json())

app.use('/', indexRoutes);
app.use('/books', booksRoutes);

app.use(logger)
app.use(errorMulter);

// app.use('/public', express.static(__dirname+'/public'))
app.use('/api', router)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('500 | Ошибка сервера')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
    console.log('Started!')
});

