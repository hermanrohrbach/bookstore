import sequelize from './connection';
import { Book } from './models/book';
import { User } from './models/user';
import booksJson from './books.json';
import * as bookAccess from './access/bookAccess';
import { InferAttributes } from 'sequelize';

export async function dbinit() : Promise<void> {
    console.log('Debug: Syncing database models');
    try {
        User.belongsToMany(Book, { through: 'UserBook' });
        Book.belongsToMany(User, { through: 'UserBook' });
        await User.sync();
        await Book.sync();
        // Put some nice books in the db if there aren't any 
        if ((await Book.findAll()).length == 0) {
            const books = booksJson as Partial<InferAttributes<Book>>[];
            await bookAccess.bulkCreate(books);
        }
        await sequelize.sync();
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('Error: ${error.message}');
        }
    }
}

export default dbinit;

