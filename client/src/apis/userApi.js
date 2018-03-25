import axios from 'axios';
import { pick } from 'lodash';

import { signPost, signGet } from './handlers/requestHandler';
import { apiPath } from './base';

const apiPrefix = `${apiPath}/user`;

export const register = (data) => {
  const request = {
    method: 'POST',
    url: `${apiPrefix}/register`,
    data,
  };
  return axios(signPost(request));
};

export const verifyRegistration = (verificationToken) => {
  const request = {
    method: 'POST',
    url: `${apiPrefix}/verify/${verificationToken}`,
    data: {},
  };
  return axios(signPost(request));
};

export const login = (data) => {
  const request = {
    method: 'POST',
    url: `${apiPrefix}/login`,
    data,
  };
  return axios(signPost(request));
};

export const requestPasswordReset = (data) => {
  const request = {
    method: 'POST',
    url: `${apiPrefix}/request-reset`,
    data,
  };
  return axios(signPost(request));
};

export const resetPassword = (data) => {
  const request = {
    method: 'POST',
    url: `${apiPrefix}/reset/${data.resetToken}`,
    data: pick(data, ['password']),
  };
  return axios(signPost(request));
};

export const getUser = () => {
  const request = {
    method: 'GET',
    url: `${apiPrefix}`,
    params: {},
  };
  return axios(signGet(request));
};
