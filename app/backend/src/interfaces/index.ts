export type TRes = {
  type?: string,
  message: string | ITeam | IMatch,
};

export type TResArrayTeams = {
  type?: string,
  message: ITeam[] | ILeaderboard[],
};

export type TResArrayMatches = {
  type?: string,
  message: IMatch[],
};

export type TResArrayLeaderboard = {
  type?: string,
  message: ILeaderboard[],
};

export interface IUserLogin {
  email: string,
  password: string,
}

export interface ITeam {
  id?: number,
  teamName: string,
}

export interface IMatch {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

export interface IMatchGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface CustomPayload {
  data: {
    email:string,
    role:string
  }
}

export interface ITeamLeaderboard {
  id: number,
  teamName: string,
  homeMatch?: IMatchLeaderboard[],
  awayMatch?: IMatchLeaderboard[],

}

export interface IMatchLeaderboard {
  homeTeamGoals: number,
  awayTeamGoals: number,

}

export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,

}
