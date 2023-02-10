import * as bcrypt from 'bcryptjs';
import { IUserLogin, TRes } from '../interfaces';
import { createToken } from '../auth/jwtFunctions';
import User from '../database/models/UserModel';

export default class UserService {
  public userModel = User;

  public async login(user: IUserLogin): Promise<TRes> {
    const { email, password } = user;
    const findUser = await this.userModel.findOne({ where: {
      email,
    } });
    if (!findUser) {
      return { type: 'INVALID_INPUT', message: 'Incorrect email or password' };
    }
    const checkPassword = bcrypt.compareSync(password, findUser.dataValues.password);
    if (!checkPassword) {
      return { type: 'INVALID_INPUT', message: 'Incorrect email or password' };
    }
    const token = createToken(user, findUser.role);
    return { type: undefined, message: token };
  }
}
