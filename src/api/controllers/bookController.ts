import { Request, Response } from 'express';
import { InferCreationAttributes, InferAttributes } from 'sequelize';
import { Book } from '../../database/models/book';
import * as bookAccess from '../../database/access/bookAccess';

export const findAll = async (req: Request, res: Response) => {
    try {
        const filter: Partial<InferAttributes<Book>> = req.body;
        const books = await bookAccess.findAllByAttributes(filter);
        console.log(`Debug: found books, sending back to client`);
        return res.status(200).send(JSON.stringify(books));
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send(error.message);
        }
        else return res.status(500).send(`An unknown error occurred`);
    }
}

export const findOne = async (req: Request, res: Response) => {
    try {
        const filter: Partial<InferAttributes<Book>> = req.body;
        const books = await bookAccess.findAllByAttributes(filter);
        if (books?.length == 1) {
            return res.status(200).send(JSON.stringify(books[0]));
        }
        else {
            throw new Error('Could not find unique book');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send(error.message);
        }
        else return res.status(500).send(`An unknown error occurred`);
    }
}

export const add = async (req: Request, res: Response) => {
    try {
        const bookInput: InferCreationAttributes<Book> = req.body;
        await Book.create(bookInput);
        console.log(`Debug: book added to library`);
        return res.status(200).send(`Book successfully added`);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send(error.message);
        }
        else return res.status(500).send(`An unknown error occurred`);
    }
}