const express = require('express')

const app = express()

require("body-parser")
require('mongoose')

const router = require('./router')

const logger = require('./multer/logger')
const errorMulter = require('./multer/error-404')

const indexRoutes = require('./routes/index')
const booksRoutes = require('./routes/books')

app.use(express.urlencoded());
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

