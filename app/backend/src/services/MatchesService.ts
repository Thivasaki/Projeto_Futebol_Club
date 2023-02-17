import { IMatch, TRes, TResArrayMatches } from '../interfaces';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class MatchesService {
  public matchModel = Match;
  public teamModel = Team;

  public async getAll(): Promise<TResArrayMatches> {
    const findAllMatches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return { type: undefined, message: findAllMatches };
  }

  public async getMatchByProgressTrue(): Promise<TResArrayMatches> {
    const findAllMatches = await this.matchModel.findAll({
      where: {
        inProgress: true,
      },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return { type: undefined, message: findAllMatches };
  }

  public async getMatchByProgressFalse(): Promise<TResArrayMatches> {
    const findAllMatches = await this.matchModel.findAll({
      where: {
        inProgress: false,
      },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return { type: undefined, message: findAllMatches };
  }

  public async addMatch(match: IMatch): Promise<TRes> {
    const findAwayTeam = await this.teamModel.findByPk(match.awayTeamId);
    const findHomeTeam = await this.teamModel.findByPk(match.homeTeamId);
    if (!findAwayTeam || !findHomeTeam) {
      return { type: 'NOT_FOUND', message: 'There is no team with such id!' };
    }
    const newMatch = await this.matchModel.create({ ...match, inProgress: true });
    return { type: undefined, message: newMatch };
  }

  public async patchMatch(id: string): Promise<TRes> {
    await this.matchModel.update({
      inProgress: false,
    }, {
      where: { id },
    });
    return { type: undefined, message: 'Finished' };
  }
}
