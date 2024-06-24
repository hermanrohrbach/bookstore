import { Request, Response } from 'express';
import { InferCreationAttributes, InferAttributes } from 'sequelize';
import { User } from '../../database/models/user';
import { Book } from '../../database/models/book';
import * as userAccess from '../../database/access/userAccess';
import * as bookAccess from '../../database/access/bookAccess';
import * as security from '../security/security';

const minPasswordLength = 3;

export const register = async (req: Request, res: Response) => {
    try {
        console.log(`Debug: entered register function`);
        var userInput: InferCreationAttributes<User> = req.body;
        // Check that the request has all required fields
        if (!userInput.name || !userInput.email || !userInput.password) {
            throw new Error(`Name, email and password required`);
        }
        if (userInput.password.length < minPasswordLength) {
            throw new Error(`Password requires at least ${minPasswordLength} characters`);
        }
        // Hash the password
        await security.hash(userInput);
        // Store the user in the db with the hashed password
        await userAccess.createUnique(userInput);       

        res.status(200).send(`User registered successfully`);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send(error.message);
        }
        else return res.status(500).send(`An unknown error occurred`);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        console.log(`Debug: entered login function`);
        var userInput: InferCreationAttributes<User> = req.body;
        const user: InferAttributes<User> | null = await userAccess.findOneByName(userInput.name);
        if (!user) {
            throw new Error('User not found');
        }
        const token = security.verifyLogin(userInput, user);
        return res.status(200).send({message: 'User successfully logged in', jwt: token});
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send(error.message);
        }
        else return res.status(500).send(`An unknown error occurred`);
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const userInput: InferCreationAttributes<User> = req.body;
        const user = await userAccess.findOneByName(userInput.name);
        if (!user) {
            throw new Error('User not found');
        }
        if ((req as security.IdRequest).token.id == user.id) {
            await userAccess.deleteById(user.id);
            return res.status(200).send({message: `User successfully removed`, user: user});
        }
        else {
            throw new Error(`Cannot remove other users`)
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send(error.message);
        }
        else {
            return res.status(500).send(`An unknown error occurred`);
        }
    }
};

/** Finds the requested book and adds it to the user's library */
export const addBook = async (req: Request, res: Response) => {
    try {
        const book: Partial<InferAttributes<Book>> = req.body;
        const foundBooks: Book[] | null = await bookAccess.findAllByAttributes(book);
        if (!foundBooks) {
            throw new Error(`Book not found`);
        }
        else if (foundBooks.length > 1) {
            throw new Error(`Too many books found`);
        }
        const user: User | null = await User.findByPk((req as security.IdRequest).token.id);
        if (!user) {
            throw new Error(`Invalid token`)
        }
        await user.addBook([foundBooks[0]]);
        return res.status(200).send(
            {
                message: `Book successfully added to your profile`, 
                title: foundBooks[0].title, 
                author: foundBooks[0].author
            }
        );
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send(error.message);
        }
        else {
            return res.status(500).send(`An unknown error occurred`);
        }
    }
}

