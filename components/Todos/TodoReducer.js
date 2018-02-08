import { createStore } from "redux";
import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_CURRENT_TODOS_PENDING,
  FETCH_CURRENT_TODOS_SUCCESS,
  FETCH_CURRENT_TODOS_ERROR,
  ADD_TODO_PENDING,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  TOGGLE_TODO_PENDING,
  TOGGLE_TODO_ERROR,
  TOGGLE_TODO_SUCCESS,
  DELETE_TODO_PENDING,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR
} from "./TodoActions";

const initialState = {
  list: []
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_PENDING:
    case FETCH_CURRENT_TODOS_PENDING:
    case ADD_TODO_PENDING:
    case TOGGLE_TODO_PENDING:
    case DELETE_TODO_PENDING:
      return { ...state, isPending: true };
    
    case FETCH_USERS_SUCCESS: 
      return { ...state, users: action.payload, isPending: false };
    
    case FETCH_CURRENT_TODOS_SUCCESS:
    case ADD_TODO_SUCCESS:
    case TOGGLE_TODO_SUCCESS:
    case DELETE_TODO_SUCCESS:
      return {...state, list: action.payload, isPending: false };
    
    case FETCH_USERS_ERROR:
    case FETCH_CURRENT_TODOS_ERROR:
    case ADD_TODO_ERROR: 
    case TOGGLE_TODO_ERROR:
    case DELETE_TODO_ERROR:
      return {...state, error: action.error, isPending: false };
    default:
      return state;
  }
}

export default todoReducer;
