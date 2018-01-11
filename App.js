import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppLoading } from 'expo';

import Header from './components/Header';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import TodoList from './components/TodoList';
import Users from './components/Users';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { ready: false };
  }

  async componentWillMount() {
    try {
      await Expo.Font.loadAsync({
        'Circular Book': require('./assets/fonts/CircularStd-Book.otf'),
        'Circular Book Italic': require('./assets/fonts/CircularStd-BookItalic.otf'),
        'Circular Bold': require('./assets/fonts/CircularStd-Bold.otf')
      });
    } catch (err) {
      console.warn(err.message);
    } finally {
      this.setState({ ready: true });
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.ready) {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <TouchableHighlight
            onPress={() => navigate('LogIn')}
            underlayColor="#feffff"
            style={styles.buttonLight}
          >
            <Text style={styles.text2}>LOG IN</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigate('SignUp')}
            underlayColor="#feffff"
            style={styles.button}
          >
            <Text style={styles.text}>SIGN UP</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const App = StackNavigator(
  {
    Initial: {
      screen: Home,
      navigationOptions: { header: <Header /> }
    },
    LogIn: { screen: LogIn },
    SignUp: { screen: SignUp },
    TodoList: {
      screen: TodoList,
      navigationOptions: { header: null, gesturesEnabled: false }
    },
    Users: {
      screen: Users,
      navigationOptions: { header: null, gesturesEnabled: true }
    }
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        timing: Animated.timing
      }
    })
  }
);

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181819',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  text: {
    backgroundColor: 'transparent',
    color: '#181819',
    fontFamily: 'Circular Bold',
    fontSize: 16,
    letterSpacing: 2
  },
  text2: {
    backgroundColor: 'transparent',
    color: '#f6d54a',
    fontFamily: 'Circular Bold',
    fontSize: 16,
    letterSpacing: 2
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6d54a',
    height: 48,
    width: width,
    padding: 32
  },
  buttonLight: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f6d54a',
    height: 48,
    width: width,
    padding: 32
  }
});

export default App;
