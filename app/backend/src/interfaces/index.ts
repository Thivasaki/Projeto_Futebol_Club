export type TRes = {
  type?: string,
  message: string,
};

export interface IUserLogin {
  email: string,
  password: string,
}

export interface CustomPayload {
  data: {
    email:string,
    role:string
  }
}
