import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  public matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const { message } = await this.matchesService.getMatchByProgressTrue();
      return res.status(200).json(message);
    }
    if (inProgress === 'false') {
      const { message } = await this.matchesService.getMatchByProgressFalse();
      return res.status(200).json(message);
    }
    const { message } = await this.matchesService.getAll();
    res.status(200).json(message);
  };

  public addMatch = async (req: Request, res: Response) => {
    const newMatch = req.body;
    const { message } = await this.matchesService.addMatch(newMatch);
    res.status(201).json(message);
  };

  public patchMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { message } = await this.matchesService.patchMatch(id);
    res.status(200).json({ message });
  };
}
