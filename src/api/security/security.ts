import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { User } from '../../database/models/user';
import * as userAccess from '../../database/access/userAccess';

const SECRET_KEY = 'THIS IS A BOOKSTORE API';
const saltRounds = 10;

/** Hashes the password from the userInput and overwrites it*/
export const hash = async (userInput: InferCreationAttributes<User>) => {
    const hashedPassword = await bcrypt.hash(userInput.password, saltRounds);
    userInput.password = hashedPassword;
}

/** Verifies the login data and returns a token if correct*/
export const verifyLogin = (userInput: InferCreationAttributes<User>, user: InferAttributes<User>) : string => {
    // Compare the provided password with the hashed password in the db
    const isMatch = bcrypt.compareSync(userInput.password, user.password);
    if (isMatch) {
        // Generate a JWT and update the database
        const token: string = jwt.sign(
            {id: user.id.toString(), name: user.name}, 
            SECRET_KEY, 
            {expiresIn: '2h'}
        );
        userAccess.update(user.id, {token: token});
        return token;
    }
    else {
        throw new Error(`Incorrect login data`);
    }
}

export interface IdJwtPayload extends JwtPayload {
    id: number;
}

export interface IdRequest extends Request {
    token: IdJwtPayload;
}

/**Authenticates the request by checking the JWT*/
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error('Invalid token');
        }
   
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as IdRequest).token = decoded as IdJwtPayload;
   
        next();
    }
    catch(error) {
        if (error instanceof Error) {
            return res.status(400).send(error.message);
        }
        else return res.status(500).send(`An unknown error occurred`);
   }
}



