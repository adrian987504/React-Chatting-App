import crypto from 'crypto-browserify';
import { getUserToken } from './token';

const SIGNATURE_SECRET = 'Qel1arIpqVAiUkWJnt4sJisVvxZFuf8jLZP4jgB3';

export const signPost = (req) => {
  const reqUrl = req.url;
  const timestamp = Math.round((new Date()).getTime() / 1000).toString();
  const text = `${req.method}+${reqUrl}+${timestamp}`;
  const signature = crypto.createHmac('sha256', SIGNATURE_SECRET).update(text).digest('hex');

  req.data.timestamp = timestamp;
  req.data.signature = signature;
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
  const reqUrl = req.url;
  const timestamp = Math.round((new Date()).getTime() / 1000).toString();
  const text = `${req.method}+${reqUrl}+${timestamp}`;
  const signature = crypto.createHmac('sha256', SIGNATURE_SECRET).update(text).digest('hex');
  if (!req.params) {
    req.params = {};
  }
  req.params.timestamp = timestamp;
  req.params.signature = signature;
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
