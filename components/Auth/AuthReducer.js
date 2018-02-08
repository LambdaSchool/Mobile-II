import { createStore } from "redux";
import {
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_PENDING,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  FETCH_CONTENT_PENDING,
  FETCH_CONTENT_SUCCESS,
  FETCH_CONTENT_ERROR,
  GET_STORED_TOKEN_PENDING,
  GET_STORED_TOKEN_SUCCESS,
  GET_STORED_TOKEN_ERROR
} from "./AuthActions";
const initialState = {
  token: undefined
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_PENDING:
      return state;
    case SIGN_UP_SUCCESS:
      return { ...state, token: action.token };
    case SIGN_UP_ERROR:
      return { ...state, token: undefined, error: action.error };

    case SIGN_IN_PENDING:
      return state;
    case SIGN_IN_SUCCESS:
      return { ...state, token: action.token };
    case SIGN_IN_ERROR:
      return { ...state, token: undefined, error: action.error };

    case SIGN_OUT_PENDING:
      return state;
    case SIGN_OUT_SUCCESS:
      return { ...state, token: undefined };
    case SIGN_OUT_ERROR:
      return { ...state, error: action.error };

    case GET_STORED_TOKEN_PENDING:
      return state;
    case GET_STORED_TOKEN_SUCCESS:
      return { ...state, token: action.token};
    case GET_STORED_TOKEN_ERROR:
      return { ...state, error: action.error};

    case FETCH_CONTENT_PENDING:
      return { ...state, isPending: true };
    case FETCH_CONTENT_SUCCESS: 
      return { ...state, users: action.payload, isPending: false }
    case FETCH_CONTENT_ERROR: 
      return {...state, error: action.error, isPending: false };
    
    default:
      return state;
  }
}

export default authReducer;
