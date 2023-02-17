import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public leaderboardAll = async (req: Request, res: Response) => {
    const { message } = await this.leaderboardService.leaderboardAll();
    res.status(200).json(message);
  };

  public leaderboardHome = async (req: Request, res: Response) => {
    const { message } = await this.leaderboardService.leaderboardHome();
    res.status(200).json(message);
  };

  public leaderboardAway = async (req: Request, res: Response) => {
    const { message } = await this.leaderboardService.leaderboardAway();
    res.status(200).json(message);
  };
}
