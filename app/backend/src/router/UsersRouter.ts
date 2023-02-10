import { Router } from 'express';
import { validateToken } from '../auth/jwtFunctions';
import loginInputValidation from '../middleware/loginInputValidation';
import UserController from '../controllers/UsersController';

const router = Router();

const userController = new UserController();

router.post('/', loginInputValidation, userController.login);
router.get('/validate', validateToken, userController.loginValidate);

export default router;
