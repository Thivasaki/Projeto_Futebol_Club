import { IMatchLeaderboard, ITeamLeaderboard } from '../interfaces';

export default class Leaderboard {
  public name: string;
  public totalPoints: number;
  public totalGames: number;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public goalsFavor: number;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: number;

  constructor(team: ITeamLeaderboard) {
    this.name = team.teamName;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 100;
    this.LeaderboardMethods(team);
  }

  public wins() {
    this.totalPoints += 3;
    this.totalVictories += 1;
  }

  public draws() {
    this.totalPoints += 1;
    this.totalDraws += 1;
  }

  public losses() {
    this.totalLosses += 1;
  }

  public LeaderboardGoals(match: IMatchLeaderboard, local: boolean) {
    if (local) {
      this.goalsFavor += match.homeTeamGoals;
      this.goalsOwn += match.awayTeamGoals;
      this.goalsBalance = this.goalsFavor - this.goalsOwn;
    }

    if (!local) {
      this.goalsFavor += match.awayTeamGoals;
      this.goalsOwn += match.homeTeamGoals;
      this.goalsBalance = this.goalsFavor - this.goalsOwn;
    }
  }

  public setEfficiency() {
    if (!this.totalGames) return 100;
    return +((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  public LeaderboardMethods(team: ITeamLeaderboard) {
    if (team.homeMatch) {
      this.totalGames += team.homeMatch.length;
      team.homeMatch.forEach((match) => {
        this.LeaderboardGoals(match, true);
        if (match.homeTeamGoals > match.awayTeamGoals) this.wins();
        else if (match.homeTeamGoals < match.awayTeamGoals) this.losses();
        else this.draws();
      });
    }
    if (team.awayMatch) {
      this.totalGames += team.awayMatch.length;
      team.awayMatch.forEach((match) => {
        this.LeaderboardGoals(match, false);
        if (match.homeTeamGoals < match.awayTeamGoals) this.wins();
        else if (match.homeTeamGoals > match.awayTeamGoals) this.losses();
        else this.draws();
      });
    } this.efficiency = this.setEfficiency();
  }
}
