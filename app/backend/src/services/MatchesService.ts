import { TResArrayMatches } from '../interfaces';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class MatchesService {
  public matchModel = Match;

  public async getAll(): Promise<TResArrayMatches> {
    const findAllMatches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return { type: undefined, message: findAllMatches };
  }
}
