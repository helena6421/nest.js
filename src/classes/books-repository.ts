import { IBook } from "../models/book";
import Book = require("../models/book");
import books = require("/Users/mac/git/ejs/routes/books.js")
import { injectable, inject } from "inversify";
import "reflect-metadata";

export abstract class BooksRepository{

    constructor() {}

    // abstract createBook(Book: IBook): Promise<IBook>;
    // abstract getBook(id: string): Promise<IBook>;
    // abstract getBooks(): Promise<IBook[]>;
    // abstract updatedBook(id: string): Promise<IBook>;
    // abstract deleteBook(id: string): Promise<IBook>;

    async getBooks(req, res) {
        const {id} = req.params;
        const books = await Book.findIndex(el => el.id === id);
        const mBooks = []
        for (let book of books) {
            mBooks.push({id: book._id})
        }
    }

    async createBook(title, description, authors, favorite, fileCover, fileName, fileBook, count) {
        const book = new Book({
            title, description, authors, favorite, fileCover, fileName, fileBook, count
        })
        try {
            await book.save();
        } catch (e) {
            console.error(e);
        }
    }

    async getBook(id, req, res, next) {
        let book
        //Получим объект книги:
        try {
            book = await Book.findById(id)
        } catch (e) {
            console.error(e)
            res.status(404).redirect('/404')
        }
    }
    
    async updateBook(id, title, description) {   
        try {
            await Book.findByIdAndUpdate(id, {title, description});
        } catch (e) {
            console.error(e);
        }
    }

    async deleteBook(id) {
        try {
            await Book.deleteOne({_id: id});
        } catch (e) {
            console.error(e);
        }
    }
}
