import bookSchema from "../models/book";
import { injectable, inject, inversify } from "inversify";
import { Container } from "inversify"
import "reflect-metadata";

export class BooksRepository{

    //constructor() {}

    // abstract createBook(Book: IBook): Promise<IBook>;
    // abstract getBook(id: string): Promise<IBook>;
    // abstract getBooks(): Promise<IBook[]>;
    // abstract updatedBook(id: string): Promise<IBook>;
    // abstract deleteBook(id: string): Promise<IBook>;

    async getBooks() {
        const books = await library.find()
        const mBooks = []
        for (let book of books) {
            mBooks.push({id: book._id})
        }
        return books
    }

    async createBook(title, description, authors, favorite, fileCover, fileName, fileBook, count) {
        const book = new bookSchema({
            title, description, authors, favorite, fileCover, fileName, fileBook, count
        })
        try {
            await book.save();
        } catch (e) {
            console.error(e);
        }
        return {'book': book }
    }

    async getBook(id) {
        let book
        try {
            book = await bookSchema.findById(id)
        } catch (e) {
            console.error(e)
            res.status(404).redirect('/404')
        }
    }
    
    async updateBook(id, title, description) {   
        try {
            await bookSchema.findByIdAndUpdate(id, {title, description});
        } catch (e) {
            console.error(e);
        }
    }

    async deleteBook(id) {
        try {
            await bookSchema.deleteOne({_id: id});
        } catch (e) {
            console.error(e);
        }
    }
}

inversify.decorate(inversify.injectable(), BooksRepository)
const container = new inversify.Container();

//const container = new Container();
container.bind(BooksRepository).toSelf()

module.exports = {container, BooksRepository}

//module.exports = {BooksRepository}
