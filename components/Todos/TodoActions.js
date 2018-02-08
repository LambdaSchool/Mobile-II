import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR   = 'FETCH_USERS_ERROR';

export const FETCH_CURRENT_TODOS_PENDING = 'FETCH_CURRENT_TODOS_PENDING';
export const FETCH_CURRENT_TODOS_SUCCESS = 'FETCH_CURRENT_TODOS_SUCCESS';
export const FETCH_CURRENT_TODOS_ERROR   = 'FETCH_CURRENT_TODOS_ERROR';

export const ADD_TODO_PENDING = 'ADD_TODO_PENDING';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_ERROR   = 'ADD_TODO_ERROR';

export const TOGGLE_TODO_PENDING = 'TOGGLE_TODO_PENDING';
export const TOGGLE_TODO_SUCCESS = 'TOGGLE_TODO_SUCCESS';
export const TOGGLE_TODO_ERROR   = 'TOGGLE_TODO_ERROR';

export const DELETE_TODO_PENDING = 'DELETE_TODO_PENDING';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_ERROR   = 'DELETE_TODO_ERROR';


const api = 'https://mobile-server-ii.herokuapp.com';

export const fetchUsers = () => async (dispatch, getState) => {
  try {
    dispatch({type: FETCH_USERS_PENDING});
    const token = getState().authentication.token;
    if (!token) throw 'Not authorized';
    const response = await axios.get(`${api}/users`, { headers: { authorization: token }});
    dispatch({type: FETCH_USERS_SUCCESS, payload: response.data});
  } catch(error) {
    dispatch({type: FETCH_USERS_ERROR, error});
  }
}

export const fetchCurrentTodos = () => async (dispatch, getState) => {
  try {
    dispatch({type: FETCH_CURRENT_TODOS_PENDING});
    const token = getState().authentication.token;
    if (!token) throw 'Not authorized';
    const response = await axios.get(`${api}/user`, { headers: { authorization: token }});
    const todoList = response.data.todos;
    dispatch({type: FETCH_CURRENT_TODOS_SUCCESS, payload: todoList});
  } catch(error) {
    dispatch({type: FETCH_CURRENT_TODOS_ERROR, error});
  }
};

export const addTodo = (text) => async (dispatch, getState) => {
  try {
    dispatch({type: ADD_TODO_PENDING});
    const token = getState().authentication.token;
    if (!token) throw 'Not authorized';
    const response = await axios.post(`${api}/todos`, {text}, { headers: { authorization: token }});
    const todoList = response.data.todos;
    dispatch({type: ADD_TODO_SUCCESS, payload: todoList});
  } catch(error) {
    dispatch({type: ADD_TODO_ERROR, error});
  }
};


export const toggleTodo = (id) => async (dispatch, getState) => {
  try {
    dispatch({type: TOGGLE_TODO_PENDING});
    const token = getState().authentication.token;
    if (!token) throw 'Not authorized';
    const response = await axios.put(`${api}/todos/${id}`, null, { headers: { authorization: token }});
    const todoList = response.data.todos;
    dispatch({type: TOGGLE_TODO_SUCCESS, payload: todoList});
  } catch(error) {
    dispatch({type: TOGGLE_TODO_ERROR, error});
  }
};

export const deleteTodo = (id) => async (dispatch, getState) => {
  try {
    dispatch({type: DELETE_TODO_PENDING});
    const token = getState().authentication.token;
    if (!token) throw 'Not authorized';
    const response = await axios.delete(`${api}/todos/${id}`, { headers: { authorization: token }});
    const todoList = response.data.todos;
    dispatch({type: DELETE_TODO_SUCCESS, payload: todoList});
  } catch(error) {
    dispatch({type: DELETE_TODO_ERROR, error});
  }
};