export interface IResponseLogin {
  success: boolean;
  error: IError | null;
  data: IDataSignIn;
}

export interface IDataSignIn {
  access_token: string;
  expires: Expires;
  refresh_token: string;
  user: IDataSignUp;
}

export interface Expires {
  access_token: Date;
  refresh_token: Date;
}
export interface IRequestSignUp {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IError {
  code: number;
  message: string;
}
export interface IResponseSignUp {
  success: boolean;
  error: null | IError;
  data: IDataSignUp;
}

export interface IDataSignUp {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  status: string;
  hasWeb3Wallet: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IResponseMe = IResponseSignUp;

export interface RequestSignup {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  condition: string;
}

export interface IRequestSignInWeb3 {
  crossmintToken: string;
  message: string;
  provider: string;
  signature: string;
  walletAddress: string;
}
export interface IRequestSignIGoogle {
  idToken: string;
}

export interface IRequestSignInCrossmint {
  token: string;
}

export interface IRequestSignInWeb3Crossmint {
  walletAddress: string;
  signature: string;
  message: string;
  provider: string;
  crossmintToken: string;
}
