import client from '@/lib/client';
import {
  RequestGenerateDeeplink,
  ResponseGenerateDeeplink,
} from '../interface';

export const generateDeeplink = (formData: RequestGenerateDeeplink) =>
  new Promise<ResponseGenerateDeeplink>((resolve, reject) => {
    client
      .post(`/involve/create-affiliate`, formData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((_error) => {
        reject(_error);
      });
  });
