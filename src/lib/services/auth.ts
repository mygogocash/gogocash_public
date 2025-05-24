import {
  IRequestSignIGoogle,
  IRequestSignInCrossmint,
  IRequestSignInWeb3,
  IRequestSignUp,
  IResponseLogin,
  IResponseMe,
  IResponseSignUp,
} from '@/features/desktop/profile/views/form/signUp/interface';
import client from '../client';

export const signinEmail = ({
  identity,
  password,
}: {
  identity: string;
  password: string;
}) =>
  new Promise<IResponseLogin>((resolve, reject) => {
    client
      .post<IResponseLogin>(`/auth/signin`, { identity, password })
      .then((response) => {
        resolve(response.data);
      })
      .catch((_error) => {
        reject(_error);
      });
  });

export const signup = (formData: IRequestSignUp) =>
  new Promise<IResponseSignUp>((resolve, reject) => {
    client
      .post<IResponseSignUp>(`/auth/signup`, formData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((_error) => {
        reject(_error);
      });
  });

export const me = (id: string) =>
  new Promise<IResponseMe>((resolve, reject) => {
    client
      .get<IResponseMe>(`/auth/me?userID=${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((_error) => {
        reject(_error);
      });
  });

export const signInWeb3 = (formData: IRequestSignInWeb3) =>
  new Promise<IResponseLogin>((resolve, reject) => {
    client
      .post<IResponseLogin>(`/auth/web3/login`, formData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((_error) => {
        reject(_error);
      });
  });

export const signInGoogleCrossmint = (formData: IRequestSignIGoogle) =>
  new Promise<IResponseLogin>((resolve, reject) => {
    client
      .post(`/auth/google/signin`, formData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((_error) => {
        reject(_error);
      });
  });

export const signInCrossmint = (formData: IRequestSignInCrossmint) =>
  new Promise<IResponseLogin>((resolve, reject) => {
    client
      .post(`/auth/web3/crossmint/validate`, formData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((_error) => {
        reject(_error);
      });
  });
