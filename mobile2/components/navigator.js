import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { SigninScreen } from '../screens/signin';
import { HomeScreen } from '../screens/home';
import { SignupScreen } from '../screens/signup';
import { ContentScreen } from '../screens/content';

export const RootNavigator = StackNavigator({
  Home: {
      screen: HomeScreen
    },
  Signin: {
      screen: SigninScreen
    },
  Signup: {
      screen: SignupScreen
    },
  Content: {
      screen: ContentScreen
    }
});
