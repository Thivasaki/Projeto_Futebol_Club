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

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { type, message } = await this.teamsService.getById(id);
    if (type) {
      return res.status(401).json({ message });
    }

    res.status(200).json(message);
  };
}
