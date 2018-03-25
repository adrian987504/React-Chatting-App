
export const getUserToken = () => {
  return localStorage.getItem('accessToken');
};

export const setUserToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const logout = () => {
  return localStorage.removeItem('accessToken');
};
