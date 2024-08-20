// -- абстрактный клас; в проекте не используется;

import { IBook } from "./book";

abstract class BooksRepository{

    constructor() {}

    abstract createBook(Book: IBook): Promise<IBook>;
    abstract getBook(id: string): Promise<IBook>;
    abstract getBooks(): Promise<IBook[]>;
    abstract updatedBook(id: string): Promise<IBook>;
    abstract deleteBook(id: string): Promise<IBook>;

}