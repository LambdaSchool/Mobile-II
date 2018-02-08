import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const SIGN_UP_PENDING = 'SIGN_UP_PENDING';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

export const SIGN_IN_PENDING = 'SIGN_IN_PENDING';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

export const SIGN_OUT_PENDING = 'SIGN_IN_PENDING';
export const SIGN_OUT_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT_ERROR = 'SIGN_IN_ERROR';

export const FETCH_CONTENT_PENDING = 'FETCH_CONTENT_PENDING';
export const FETCH_CONTENT_SUCCESS = 'FETCH_CONTENT_SUCCESS';
export const FETCH_CONTENT_ERROR = 'FETCH_CONTENT_ERROR';

export const GET_STORED_TOKEN_PENDING = 'GET_STORED_TOKEN_PENDING';
export const GET_STORED_TOKEN_SUCCESS = 'GET_STORED_TOKEN_SUCCESS';
export const GET_STORED_TOKEN_ERROR = 'GET_STORED_TOKEN_ERROR';

const api = 'https://mobile-server-ii.herokuapp.com';

export const signUp = ({email, password}) => dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({type: SIGN_UP_PENDING});
    try {
      const response = await axios.post(`${api}/users`, { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      dispatch({type: SIGN_UP_SUCCESS, token});
      resolve(token);
    } catch(error) {
      dispatch({type: SIGN_UP_ERROR, error});
      reject(error);
    }
  });
}

export const signIn = ({email, password}) => dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({type: SIGN_IN_PENDING});
    try {
      const response = await axios.post(`${api}/signin`, { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      dispatch({type: SIGN_IN_SUCCESS, token});
      resolve(token);
    } catch(error) {
      dispatch({type: SIGN_IN_ERROR, error});
      reject(error);
    }
  });
}

export const signOut = () => dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({type: SIGN_OUT_PENDING})
    try {
      await AsyncStorage.removeItem('token');
      dispatch({type: SIGN_OUT_SUCCESS});
      resolve();
    } catch(err) {
      dispatch({type: SIGN_OUT_ERROR, error});
      reject(err);
    }
  });
}

export const getStoredToken = () => async dispatch => {
  try {
    dispatch({type: GET_STORED_TOKEN_PENDING});
    const token = await AsyncStorage.getItem('token');
    if (!token) throw 'no token in storage';
    dispatch({type: GET_STORED_TOKEN_SUCCESS, token});
  } catch(error) {
    dispatch({type: GET_STORED_TOKEN_ERROR, error});
  } 
}

export const fetchContent = () => async (dispatch, getState) => {
  try {
    dispatch({type: FETCH_CONTENT_PENDING});
    const token = getState().authentication.token;
    console.log('token from state is', token);
    const response = await axios.get(`${api}/users`, { headers: { authorization: token }});
    dispatch({type: FETCH_CONTENT_SUCCESS, payload: response.data});
  } catch(error) {
    console.log(error.message);
    dispatch({type: FETCH_CONTENT_ERROR, error});
  }
}