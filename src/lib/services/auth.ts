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

export const signInCrossmint = (
  formData: IRequestSignInCrossmint,
  jwt: string
) =>
  new Promise<IResponseLogin>((resolve, reject) => {
    // Prepare the request payload with proper validation

    client
      .post<IResponseLogin>(`/auth/sign-in`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // Enhance error message for better user experience
        const enhancedError = {
          ...error,
          response: {
            ...error.response,
            data: {
              ...error.response?.data,
              message:
                error.response?.data?.message ||
                'Authentication failed. Please try again.',
            },
          },
        };

        reject(enhancedError);
      });
  });
