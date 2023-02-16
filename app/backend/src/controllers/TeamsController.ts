import { Request, Response } from 'express';
import { CustomPayload } from '../interfaces';
import UserService from '../services/UsersService';
import { CustomRequest } from '../auth/jwtFunctions';

export default class UserController {
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public login = async (req: Request, res: Response) => {
    const user = req.body;
    const { type, message } = await this.userService.login(user);
    if (type) {
      return res.status(401).json({ message });
    }

    res.status(200).json({ token: message });
  };

  public loginValidate = async (req: Request, res: Response) => {
    const { payload } = req as CustomRequest;
    res.status(200).json({ role: (payload as CustomPayload).data.role });
  };
}
