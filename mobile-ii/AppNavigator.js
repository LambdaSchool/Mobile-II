import React, { Component } from 'react';
import { BackHandler, Image } from "react-native";
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Users from './Users';
import Main from './Main';
import User from './User';

export const AppNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  SignUp: {
    screen: SignUp
  },
  SignIn: {
    screen: SignIn
  },
  Main: {
    screen: Main
  },
  User: {
    screen: User
  },
  Users: {
    screen: Users
  }
});

class AppWithNavigationState extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  };
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };
  render() {
    const { dispatch, nav } = this.props;
    return <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  };
};

const mapStateToProps = (state) => ({ nav: state.nav });

export default connect(mapStateToProps)(AppWithNavigationState);
