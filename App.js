import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StackNavigator } from 'react-navigation';

/* reducers */
import authentication from './components/Auth/AuthReducer';
import todos from './components/Todos/TodoReducer';

/* components */
import Home from './components/Home';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Content from './components/Todos/Content';
import Todos from './components/Todos/Todos';

const rootReducer = combineReducers({authentication, todos});
const store = createStore(rootReducer, applyMiddleware(thunk));

const RootStack = StackNavigator(
  {
    SignIn: {screen: SignIn},
    SignUp: {screen: SignUp},
    Home: {screen: Home},
    Content: {screen: Content},
    Todos: {screen: Todos}
  },
  {
    initialRouteName: 'Home'
  }
);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
