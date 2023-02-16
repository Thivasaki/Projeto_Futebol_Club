import { TResArrayTeams } from '../interfaces';
import Team from '../database/models/TeamModel';

export default class UserService {
  public teamModel = Team;

  public async getAll(): Promise<TResArrayTeams> {
    const findTeam = await this.teamModel.findAll();
    return { type: undefined, message: findTeam };
  }
}
