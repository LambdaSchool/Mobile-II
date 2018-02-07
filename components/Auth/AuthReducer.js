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
  GET_STORED_TOKEN_PENDING,
  GET_STORED_TOKEN_SUCCESS,
  GET_STORED_TOKEN_ERROR,
} from "./AuthActions";
const initialState = {
  token: undefined
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_PENDING:
      return state;
    case SIGN_UP_SUCCESS:
      console.log("SIGN_UP_SUCCESS DISPATCH:");
      console.log(action.token);
      return { ...state, token: action.token };
    case SIGN_UP_ERROR:
      console.log("SIGN_UP_ERROR DISPATCH:");
      console.log(action.error);
      return { ...state, token: undefined, error: action.error };

    case SIGN_IN_PENDING:
      return state;
    case SIGN_IN_SUCCESS:
      console.log("SIGN_IN_SUCCESS DISPATCH:");
      console.log(action.token);
      return { ...state, token: action.token };
    case SIGN_IN_ERROR:
      console.log("SIGN_IN_ERROR DISPATCH:");
      console.log(action.error);
      return { ...state, token: undefined, error: action.error };

    case GET_STORED_TOKEN_PENDING:
      return state;
    case GET_STORED_TOKEN_SUCCESS:
      console.log("GET_STORED_TOKEN_SUCCESS DISPATCH:");
      console.log("token: ", action.token);
      return { ...state, token: action.token };
    case GET_STORED_TOKEN_ERROR:
      console.log("GET_STORED_TOKEN_ERROR: ", action.error);
      return { ...state, error: action.error };

    case SIGN_OUT_PENDING:
      return state;
    case SIGN_OUT_SUCCESS:
      return {...state, token: undefined};
    case SIGN_OUT_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}

export default authReducer;
