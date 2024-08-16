import { appendFile } from 'fs' // для записи (дозаписи) в файл 
import { EOL } from 'os'

export default (req, res, next) => {
    const now = Date.now()
    const {url, method} = req

    const data = `${now} ${method} ${url}` // основная информация

    appendFile("server.log", data + EOL, (err) => {  // дозапись
        if (err) throw err;
    })

    next()
}
