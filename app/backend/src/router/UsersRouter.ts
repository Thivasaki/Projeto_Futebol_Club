import { Router } from 'express';
import loginInputValidation from '../middleware/loginInputValidation';
import UserController from '../controllers/UsersController';

const router = Router();

const userController = new UserController();

router.post('/', loginInputValidation, userController.login);

export default router;
