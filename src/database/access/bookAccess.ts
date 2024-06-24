/** Wrapper for basic SQL transactions on the Books table */
import { InferCreationAttributes, InferAttributes } from 'sequelize';
import { Book } from '../models/book';

export const createUnique = async (payload: InferCreationAttributes<Book>): Promise<InferAttributes<Book>> => {
    if (await Book.findOne({where: payload})) {
        throw new Error('A book with the same attributes already exists');
    }
    const user = await Book.create(payload);
    return user;
}

export const findAll = async (): Promise<Book[]> => {
    return Book.findAll();
}

export const findAllByAttributes = async (payload: Partial<InferAttributes<Book>>): Promise<Book[] | null> => {
    return Book.findAll({where: payload});
}

export const bulkCreate = async (payload: Partial<InferAttributes<Book>>[]): Promise<InferAttributes<Book>[]> => {
    // TODO: properly check the type of the payload before casting (instanceof does not work)
    const books = await Book.bulkCreate(payload as InferCreationAttributes<Book>[]);
    return books;
}