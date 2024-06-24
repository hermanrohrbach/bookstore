import express from 'express';
import { Request, Response } from 'express';
import { dbinit } from './database/dbinit';
import { userRouter } from './api/routes/userRouter';
import { bookRouter } from './api/routes/bookRouter';

const app = express();
const port = 3000;

// Middleware for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: make index.ts in routes folder to manage routing
//API
app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);

app.get('/', async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `This is a bookstore API. Endpoints available at http://localhost:${port}/api/` })
})

dbinit().then(() => {
    console.log(`Debug: Database connection established and models synchronized successfully`);
    try { 
        app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        })
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
        else {
            console.log(`An unknown error occurred`);
        }
        
    }
})


