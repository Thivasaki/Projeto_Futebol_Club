export type TRes = {
  type?: string,
  message: string | ITeam,
};

export type TResArrayTeams = {
  type?: string,
  message: ITeam[],
};

export type TResArrayMatches = {
  type?: string,
  message: IMatch[],
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
  inProgress: boolean,
}

export interface CustomPayload {
  data: {
    email:string,
    role:string
  }
}
