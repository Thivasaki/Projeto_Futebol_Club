import { Request, Response } from 'express';
import UserService from '../services/UsersService';

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
}
