import { TRes } from '../interfaces';
import Team from '../database/models/TeamModel';

export default class UserService {
  public teamModel = Team;

  public async login(): Promise<TRes> {
  }
}
