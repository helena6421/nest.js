import mongoose = require('mongoose');
const {Schema, SchemaTypes} = mongoose;

class IBook {
    id: number;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;

    constructor(
        id: number,
        title: string, 
        description: string, 
        authors: string, 
        favorite: string, 
        fileCover: string, 
        fileName: string,
        fileBook: string,) 
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
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
    ]
}

interface Book extends IBook, store{
    id: number,
    title: string,
    description: string,
    authors: string,
    favorite: string,
    fileCover: string,
    fileName: string,
    fileBook: string,
}

const bookSchema = new Schema({
    id: {
        type: SchemaTypes.Number,
        required: true,
    },
    title: {
        type: SchemaTypes.String,
        required: true,
    },
    description: {
        type: SchemaTypes.String,
        required: true,
    },
    authors: {
        type: SchemaTypes.String,
        required: false,
    },
    favorite: {
        type: SchemaTypes.String,
        required: false,
    },
    fileCover: {
        type: SchemaTypes.String,
        required: false,
    },
    fileName: {
        type: SchemaTypes.String,
        required: false,
    },
    fileBook: {
        type: SchemaTypes.String,
        required: false,
    }
});

const Book = mongoose.model("Book", bookSchema);
export { Book }
