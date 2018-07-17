import { getUserToken } from './token';

export const signPost = (req) => {
  const authorization = `Bearer ${getUserToken()}`;
  if (getUserToken()) {
    if (req.headers) {
      req.headers.Authorization = authorization;
    } else {
      req.headers = { Authorization: authorization };
    }
  }
  return req;
};

export const signGet = (req) => {
  if (!req.params) {
    req.params = {};
  }
  const authorization = `Bearer ${getUserToken()}`;
  if (getUserToken()) {
    if (req.headers) {
      req.headers.Authorization = authorization;
    } else {
      req.headers = { Authorization: authorization };
    }
  }
  return req;
};
