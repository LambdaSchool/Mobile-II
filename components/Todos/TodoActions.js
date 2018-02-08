import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

const api = 'https://mobile-server-ii.herokuapp.com';

export const fetchUsers = () => async (dispatch, getState) => {
  try {
    dispatch({type: FETCH_USERS_PENDING});
    const token = getState().authentication.token;
    if (!token) throw 'Not authorized';
    const response = await axios.get(`${api}/users`, { headers: { authorization: token }});
    dispatch({type: FETCH_USERS_SUCCESS, payload: response.data});
  } catch(error) {
    console.log(error.message);
    dispatch({type: FETCH_USERS_ERROR, error});
  }
}