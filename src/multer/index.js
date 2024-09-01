// Multer — это middleware для фреймворка express для обработки multipart/form-data, 
// нужная в первую очередь при загрузке файлов.

// -- Конфигурация multer (middleware)
// Используем это в router/index.js

import multer, { Multer, diskStorage } from 'multer'

const storage = diskStorage({
    destination(cb){
        cb(null, 'public/books') //callback ф-я
    },
    filename(file, cb) { // как мы будем называть наши файлы в папке public/books
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export default multer({storage})
