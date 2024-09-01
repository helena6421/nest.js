const Book = require("../models/book")
const Container = require ('inversify')
const injectable = require ('inversify')
const decorate = require ('inversify')
require ("reflect-metadata");

export class BooksRepository{

    // Получает из базы данных список всех книг:
    async getBooks() {
        const books = await Book.find()
        const _Books = []
        for (let book of books) {
            _Books.push({id: book._id})
        }
        return books
    }

    // Добавлет в базу данных новую книгу:
    async createBook(title, description, authors, favorite, fileCover, fileName, fileBook) {
        const book = new Book({
            title, description, authors, favorite, fileCover, fileName, fileBook
        })
        try {
            await book.save();
        } catch (e) {
            console.error(e);
        }
        return {'book': book }
    }

    // Получает книгу из базы данных по айди:
    async getBook(id) {
        let book
        try {
            book = await Book.findById(id)
        } catch (e) {
            console.error(e)
            //res.status(404).redirect('/404')
        }
    }
    
    // Обновляет книгу в базе данных:
    async updateBook(id, title, description) {   
        try {
            await Book.findByIdAndUpdate(id, {title, description});
        } catch (e) {
            console.error(e);
        }
    }

    // Удаляет книгу из базы данных:
    async deleteBook(id) {
        try {
            await Book.deleteOne({_id: id});
        } catch (e) {
            console.error(e);
        }
    }
}

decorate(injectable(), BooksRepository)
const container = new Container();

container.bind(BooksRepository).toSelf().inSingletonScope(); // кеш

export {container}
