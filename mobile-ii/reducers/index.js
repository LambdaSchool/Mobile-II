import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../AppNavigator';
import {
  AUTH,
  NAVAUTH,
  NAV,
  USERS,
  ERROR,
  CLEARERROR
} from '../actions';


const initialNavState = AppNavigator.router.getStateForAction(NavigationActions.init());

const navReducer = (state = initialNavState, action) => {
  switch (action.type) {
    case NAV:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.next }),
        state
      );
    case NAVAUTH:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }),
        state
      );
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};

const user = { email: null, todos: [] };
const initialAuth = { user, isLoggedIn: false, users: [], };

const userReducer = (state = initialAuth, action) => {
  switch(action.type) {
    case AUTH:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true
      }
    case USERS:
      return {
        ...state,
        users: action.users
      }
    default:
      return state;
  }
};

const initialError = { isError: false, message: '' };

const errorReducer = (state = initialError, action) => {
  switch(action.type) {
    case ERROR: {
      return {
        isError: true,
        message: action.message
      }
    };
    case CLEARERROR: {
      return {
        isError: false,
        message: ''
      }
    };
    default:
      return state;
  }
};

export default combineReducers({
  nav: navReducer,
  user: userReducer,
  error: errorReducer
});
