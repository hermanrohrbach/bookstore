import { Router } from 'express'
import * as bookController from '../controllers/bookController';
import { auth } from '../security/security';

export const bookRouter = Router();

// Test function to see if the Router works
bookRouter.get('/echo/:echoMessage', (req, res) => {
    res.send(req.params);
})

bookRouter.get('/findAll', auth, bookController.findAll);
bookRouter.get('/findOne', auth, bookController.findOne);
bookRouter.post('/add', auth, bookController.add);

export default bookRouter;