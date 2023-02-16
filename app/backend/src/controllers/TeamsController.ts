import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class UserController {
  public teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  public getAll = async (req: Request, res: Response) => {
    const { message } = await this.teamsService.getAll();
    res.status(200).json(message);
  };
}
