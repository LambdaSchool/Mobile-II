import { createStore } from "redux";
import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
} from "./TodoActions";
const initialState = {
  token: undefined
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_PENDING:
      return { ...state, isPending: true };
    case FETCH_USERS_SUCCESS: 
      return { ...state, users: action.payload, isPending: false }
    case FETCH_USERS_ERROR: 
      return {...state, error: action.error, isPending: false };
    
    default:
      return state;
  }
}

export default todoReducer;
