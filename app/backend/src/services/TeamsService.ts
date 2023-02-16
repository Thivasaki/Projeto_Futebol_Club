import { TResArrayTeams, TRes } from '../interfaces';
import Team from '../database/models/TeamModel';

export default class UserService {
  public teamModel = Team;

  public async getAll(): Promise<TResArrayTeams> {
    const findTeam = await this.teamModel.findAll();
    return { type: undefined, message: findTeam };
  }

  public async getById(id: string): Promise<TRes> {
    const findTeam = await this.teamModel.findByPk(id);
    if (!findTeam) {
      return { type: 'NOT_FOUND', message: 'The team dont exist' };
    }
    return { type: undefined, message: findTeam };
  }
}
