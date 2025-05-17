import axios, { AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';
const baseURL = process.env.NEXT_PUBLIC_API;
const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

client.interceptors.request.use(
  async (config) => {
    const session = await getSession(); // Get session
    // console.log('session', session);
    
    if (session?.user?.access_token) {
      config.headers.Authorization = `Bearer ${session.user.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// レスポンスインターセプター
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      //   throw new Error(error.response.data.message || 'API request failed');
      return error.response;
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
);

export default client;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await client.get(url, { ...config });

  return res.data;
};

export const fetcherPost = async (
  args: string | [string, AxiosRequestConfig]
) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await client.post(url, { ...config });

  return res.data;
};

export const fetcherPut = async (
  args: string | [string, AxiosRequestConfig]
) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await client.put(url, { ...config });

  return res.data;
};
