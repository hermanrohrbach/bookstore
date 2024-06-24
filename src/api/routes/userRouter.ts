import { Router } from 'express'
import * as userController from '../controllers/userController';
import { auth } from '../security/security';

export const userRouter = Router();

// Test function to see if the Router works
userRouter.get('/echo/:echoMessage', (req, res) => {
    res.send(req.params);
})

userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
userRouter.delete('/remove', auth, userController.remove);
userRouter.post('/addBook', auth, userController.addBook);

export default userRouter;