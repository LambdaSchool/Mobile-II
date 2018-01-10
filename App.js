import React, { Component } from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  AsyncStorage
} from 'react-native';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Users from './components/Users/Users';
import Todos from './components/Todos/Todos';
import { StackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

class Home extends Component {
  constructor(props) {
    super(props); 
    this.state = {

    }
    this.title = new Animated.Value(0);
    this.button1 = new Animated.Value(0);
    this.button2 = new Animated.Value(0);
    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        height: 45,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22.5,
        // shadowColor: '#000',
        // shadowOffset: { width: 2, height: 3 },
        // shadowOpacity: 0.25,
        // shadowRadius: 2.5, 
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 2,
        marginBottom: 20,
        transform: [
          {
            scaleX: this.button1.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })
          }
        ]
      }
    });
  }

  componentDidMount = () => {
    Animated.sequence([
      Animated.timing(this.title, { toValue: 1, duration: 750}),
      Animated.parallel([
        Animated.spring(this.button1, { toValue: 1 }),
        Animated.timing(this.button2, { toValue: 1, delay: 350, duration: 300 })
      ])
    ]).start();
    AsyncStorage.getItem('token').then((token) => {
      this.props.navigation.navigate('Users');
    });
  }

  render = () => {
    return (
      <View style={this.styles.container}>
        <StatusBar
           backgroundColor="transparent"
           barStyle="default"
         />
        <LinearGradient
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
          colors={['#ff5f6d', '#ffc371']}>
          <Animated.Text 
            style={{
              fontSize: 27.5,
              fontWeight: '200',
              textAlign: 'center',
              marginBottom: 30,
              backgroundColor: 'transparent',
              color: '#fff',
              shadowColor: '#000000',
              shadowOffset: { width: 6, height: 6 },
              shadowOpacity: 0.5,
              shadowRadius: 5, 
              transform: [
                {
                  translateY: this.title.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0]
                  })
                }
              ],
              opacity: this.title.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              })
            }}>
            Welcome to Mobile-Auth
          </Animated.Text>
          <TouchableOpacity 
            style={this.styles.button}
            onPress={() => this.props.navigation.navigate('SignIn')}>
            <View>
              <Animated.Text
                style={{
                  color: '#fff',
                  fontWeight: '900',
                  fontSize: 15,
                  opacity: this.button2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                  })
                }}>Sign In</Animated.Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={this.styles.button}
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <View>
              <Animated.Text
                style={{
                  color: '#fff',
                  fontWeight: '900',
                  fontSize: 15,
                  opacity: this.button2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                  })
                }}>Sign Up</Animated.Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const Nav = StackNavigator({
  Home: { 
    screen: Home,
    navigationOptions: {
      title: 'Home',
      headerTitle: 'Home',
      headerStyle: {
        backgroundColor: '#fff',
        borderWidth: 0,
        borderColor: '#ff5f6d',
        shadowColor: '#000000',
        shadowOffset: { width: 6, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5, 
      },
      headerTitleStyle: {
        color: '#ff5f6d'
      },
      headerBackTitleStyle: {
        color: '#ff5f6d'
      }
    },
  },
  SignUp: { 
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
      headerTitle: 'Sign Up',
      headerStyle: {
        backgroundColor: '#fff',
        borderWidth: 0,
        borderColor: '#ff5f6d',
        shadowColor: '#000000',
        shadowOffset: { width: 6, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5, 
      },
      headerTitleStyle: {
        color: '#ff5f6d'
      },
      headerBackTitleStyle: {
        color: '#ff5f6d'
      }
    },
  },
  SignIn: { 
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
      headerTitle: 'Sign In',
      headerStyle: {
        backgroundColor: '#fff',
        borderWidth: 0,
        borderColor: '#ff5f6d',
        shadowColor: '#000000',
        shadowOffset: { width: 6, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5, 
      },
      headerTitleStyle: {
        color: '#ff5f6d'
      },
      headerBackTitleStyle: {
        color: '#ff5f6d'
      }
    },
  },
  Users: {
    screen: Users,
    navigationOptions: {
      title: 'Users',
      headerTitle: 'Users',
      headerStyle: {
        backgroundColor: '#fff',
        borderWidth: 0,
        borderColor: '#ff5f6d',
        shadowColor: '#000000',
        shadowOffset: { width: 6, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5, 
      },
      headerTitleStyle: {
        color: '#ff5f6d'
      },
      headerBackTitleStyle: {
        color: '#ff5f6d'
      }
    },
  },
  Todos: {
    screen: Todos,
    navigationOptions: {
      title: 'My Todos',
      headerTitle: 'My Todos',
      headerStyle: {
        backgroundColor: '#fff',
        borderWidth: 0,
        borderColor: '#ff5f6d',
        shadowColor: '#000000',
        shadowOffset: { width: 6, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5, 
      },
      headerTitleStyle: {
        color: '#ff5f6d'
      },
      headerBackTitleStyle: {
        color: '#ff5f6d'
      }
    },
  }
}, {
  headerMode: 'float',
  // mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(1)),
      timing: Animated.spring
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps
      const { index } = scene

      const width = layout.initWidth
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, width * -1],
      });

      const scale = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0.75, 1, 0.75]
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateX }, {scale}] }
    },
  }),
});

export default Nav;