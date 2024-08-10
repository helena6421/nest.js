import { Container } from "inversify";
import { BooksRepository } from "../classes/books-repository";

const container = new Container();

container.bind(BooksRepository).toSelf()
