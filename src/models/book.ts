import { Schema, model, Document, Model } from 'mongoose';

export class IBook {
    id: number;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
    count: number;

    constructor(
        id: number,
        title: string, 
        description: string, 
        authors: string, 
        favorite: string, 
        fileCover: string, 
        fileName: string,
        fileBook: string,
        count: number,) 
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
        this.count = count;
    }
}

interface store {
    books: [
        id: number,
        title: string,
        description: string,
        authors: string,
        favorite: string,
        fileCover: string,
        fileName: string,
        fileBook: string,
        count: number,
    ]
}

interface Book extends IBook, Document{
    id: number,
    title: string,
    description: string,
    authors: string,
    favorite: string,
    fileCover: string,
    fileName: string,
    fileBook: string,
    count: number,
}

// class Store {
//     id = 1;
//     title = "Harry Potter";
//     description = "A film series about Harry Potter";
//     authors = "J. K. Rowling";
//     favorite = "true";
//     fileCover = "Hard cover";
//     fileName = "Harry Potter";
//     fileBook = "Harry Potter";
//     count = 5000;
// }

const bookSchema = new Schema<Book>({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: false,
    },
    favorite: {
        type: String,
        required: false,
    },
    fileCover: {
        type: String,
        required: false,
    },
    fileName: {
        type: String,
        required: false,
    },
    fileBook: {
        type: String,
        required: false,
    },
    count: {
        type: Number,
        required: false,
    }
});


export default model<Book>('Book', bookSchema) as Model<Book>;
