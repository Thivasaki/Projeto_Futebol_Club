import { ILeaderboard, TResArrayLeaderboard } from '../interfaces';
import Team from '../database/models/TeamModel';
import Leaderboard from '../utils/Leaderboard';

export default class LeaderboardService {
  public teamModel = Team;

  public static sortLeaderboard(teams: ILeaderboard[]) {
    const sortedTeams = teams.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);

    return sortedTeams;
  }

  public async leaderboardAll(): Promise<TResArrayLeaderboard> {
    const allTeams = await this.teamModel.findAll({
      include: [
        { association: 'homeMatch',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false } },
        { association: 'awayMatch',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false } },
      ],
    });
    const newLeaderboardHome = allTeams.map((team) => new Leaderboard(team));
    const sortedTeams = LeaderboardService.sortLeaderboard(newLeaderboardHome);
    return { type: undefined, message: sortedTeams };
  }

  public async leaderboardHome(): Promise<TResArrayLeaderboard> {
    const allTeams = await this.teamModel.findAll({
      include: [
        { association: 'homeMatch',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false } },
      ],
    });
    const newLeaderboardHome = allTeams.map((team) => new Leaderboard(team));
    const sortedTeams = LeaderboardService.sortLeaderboard(newLeaderboardHome);
    return { type: undefined, message: sortedTeams };
  }

  public async leaderboardAway(): Promise<TResArrayLeaderboard> {
    const allTeams = await this.teamModel.findAll({
      include: [
        { association: 'awayMatch',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false } },
      ],
    });
    const newLeaderboardHome = allTeams.map((team) => new Leaderboard(team));
    const sortedTeams = LeaderboardService.sortLeaderboard(newLeaderboardHome);
    return { type: undefined, message: sortedTeams };
  }
}
