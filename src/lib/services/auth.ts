import {
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
