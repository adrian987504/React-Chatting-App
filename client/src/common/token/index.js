
export const getUserToken = () => {
  return localStorage.getItem('accessToken');
};

export const setUserToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const logout = () => {
  return localStorage.removeItem('accessToken');
};

export const setUserEmail = (token) => {
  localStorage.setItem('email', token);
};

export const setUserPassword = (token) => {
  localStorage.setItem('password', token);
};

export const getUserEmail = () => {
  return localStorage.getItem('email');
};

export const getUserPassword = () => {
  return localStorage.getItem('password');
};
