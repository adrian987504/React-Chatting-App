import { getUserToken } from '../../token';

const token = (state = { token: getUserToken() }, action) => {
  console.log('token');
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    default:
      return state;
  }
};

export default token;
