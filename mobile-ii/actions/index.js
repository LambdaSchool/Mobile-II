import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const AUTH = "AUTH";
export const NAVAUTH = "NAVAUTH";
export const NAV = "NAV";
export const USERS = "USERS";
export const ERROR = "ERROR";
export const CLEARERROR = "CLEARERROR";

export const nav = next => dispatch => dispatch({ type: NAV, next });

export const signedIn = (change) => async (dispatch) => {
  try {
    token = await AsyncStorage.getItem('token');
    if (!token) return;
    const res = await axios.get('https://mobile-server-ii.herokuapp.com/user', { headers: { authorization: token }});
    if (res.status === 200) {
      if (change) dispatch({ type: NAV, next: 'Main' });
      dispatch({ type: AUTH, user: res.data});
    }
  } catch(err) {
    dispatch(errorAction('token not valid'));
  }
};

export const signIn = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('https://mobile-server-ii.herokuapp.com/signin', { email, password });
    await AsyncStorage.setItem('token', res.data.token);    
    dispatch({ type: AUTH, user: res.data.user });
    dispatch({ type: NAVAUTH });
  } catch(err) {
    dispatch(errorAction('Invalid credentials, Try Again!!'));
    setTimeout(() => dispatch(clearError()), 2000);
  }
};

export const signUp = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('https://mobile-server-ii.herokuapp.com/users', { email, password });
    if (res.data.errors) return console.log(res.data.errors);
    await AsyncStorage.setItem('token', res.data.token);    
    dispatch({ type: AUTH, user: res.data.user });
    dispatch({ type: NAVAUTH });
  } catch(err) {
    dispatch(errorAction('Try a different email!'));
    setTimeout(() => dispatch(clearError()), 2000);
  }
};

export const users = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.get('https://mobile-server-ii.herokuapp.com/users', { headers: { 'authorization': token }});
    dispatch({ type: USERS, users: res.data });
  } catch (err) {
    dispatch(errorAction('Cannot retrieve users!!'));
    setTimeout(() => dispatch(clearError()), 2000);
  }
};

export const todo = (info, type) => async (dispatch) => {
  try {
    let res;
    if (type === 'submit') res = await axios.post('https://mobile-server-ii.herokuapp.com/todos', { text: info }, { headers: { authorization: token }});
    if (type === 'change') res = await axios.put(`https://mobile-server-ii.herokuapp.com/todos/${info}`, {}, { headers: { authorization: token }});
    if (type === 'delete') res = await axios.delete(`https://mobile-server-ii.herokuapp.com/todos/${info}`, { headers: { authorization: token }});
    dispatch({ type: AUTH, user: res.data });
  } catch(err) {
    dispatch(errorAction('Cannot update todos!!'));
    setTimeout(() => dispatch(clearError()), 2000);
  }
}

export const errorAction = (message) => { 
  return { type: ERROR, message }
};

export const clearError = () => { 
  return { type: CLEARERROR }
};