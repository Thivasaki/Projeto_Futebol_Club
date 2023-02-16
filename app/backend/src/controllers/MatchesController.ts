import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  public matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public getAll = async (req: Request, res: Response) => {
    const { message } = await this.matchesService.getAll();
    res.status(200).json(message);
  };
}
