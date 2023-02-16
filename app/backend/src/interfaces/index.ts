export type TRes = {
  type?: string,
  message: string,
};

export type TResArrayTeams = {
  type?: string,
  message: ITeam[],
};

export interface IUserLogin {
  email: string,
  password: string,
}

export interface ITeam {
  id: number,
  teamName: string,
}

export interface CustomPayload {
  data: {
    email:string,
    role:string
  }
}
