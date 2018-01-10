import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import InputStyles from '../InputStyles';
import Axios from 'axios';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.placeholder1 = new Animated.Value(0);
    this.placeholder2 = new Animated.Value(0);
    this.bar1 = new Animated.Value(0);
    this.bar2 = new Animated.Value(0);
    this.url = 'https://mobile-server-ii.herokuapp.com/signin';
  }

  focus1 = () => {
    Animated.parallel([
      Animated.spring(this.placeholder1, {toValue: 1}),
      Animated.spring(this.bar1, {toValue: 1})
    ]).start();
  }

  blur1 = () => {
    if(this.state.email === '') {
      Animated.parallel([
        Animated.spring(this.placeholder1, {toValue: 0}),
        Animated.spring(this.bar1, {toValue: 0})
      ]).start();
    }
  }

  focus2 = () => {
    Animated.parallel([
      Animated.spring(this.placeholder2, {toValue: 1}),
      Animated.spring(this.bar2, {toValue: 1})
    ]).start();
  }

  blur2 = () => {
    if(this.state.password === '') {
      Animated.parallel([
        Animated.spring(this.placeholder2, {toValue: 0}),
        Animated.spring(this.bar2, {toValue: 0})
      ]).start();
    }
  }

  submit = () => {
    const { email, password } = this.state;
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && password !== '') {
      Axios.post(this.url, this.state)
      .then(res => {
        console.log(res);
        if(res.data.token) {
          AsyncStorage.setItem('MobileAuthToken', res.data.token)
          .then(() => {
            this.props.navigation.navigate('Users');
          })
          .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
    }
  }

  render = () => {
    return (
      <TouchableWithoutFeedback 
        style={InputStyles.container}
        onPress={Keyboard.dismiss}>
        <LinearGradient
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          colors={['#ff5f6d', '#ffc371']}>
          <Text style={InputStyles.heading}>Sign In</Text>
          <View style={InputStyles.inputContainer}>
            <Animated.Text 
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                textAlign: 'left',
                width: '85%',
                transform: [
                  {
                    translateY: this.placeholder1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [35, 0]
                    })
                  },
                  {
                    translateX: this.placeholder1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0]
                    })
                  },
                  {
                    scale: this.placeholder1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1.2, 1]
                    })
                  }
                ]
              }}>Email</Animated.Text>
            <TextInput
              onBlur={this.blur1}
              onFocus={this.focus1}
              style={InputStyles.input}
              value={this.state.email}
              onChangeText={email => this.setState({email})} />
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                left: '7.5%',
                height: 2,
                width: '85%',
                backgroundColor: '#fff',
                transform: [
                  {
                    scaleX: this.bar1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1]
                    })
                  }
                ]
              }}></Animated.View>
          </View>
          <View style={InputStyles.inputContainer}>
            <Animated.Text 
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                textAlign: 'left',
                width: '85%',
                transform: [
                  {
                    translateY: this.placeholder2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [35, 0]
                    })
                  },
                  {
                    translateX: this.placeholder2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0]
                    })
                  },
                  {
                    scale: this.placeholder2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1.2, 1]
                    })
                  }
                ]
              }}>Password</Animated.Text>
            <TextInput
              onBlur={this.blur2}
              onFocus={this.focus2}
              style={InputStyles.input}
              value={this.state.password}
              onChangeText={password => this.setState({password})}
              secureTextEntry={true}
              blurOnSubmit={true} />
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                left: '7.5%',
                height: 2,
                width: '85%',
                backgroundColor: '#fff',
                transform: [
                  {
                    scaleX: this.bar2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1]
                    })
                  }
                ]
              }}></Animated.View>
          </View>
          <TouchableOpacity 
            style={InputStyles.button}
            onPress={this.submit}>
            <View>
              <Text 
                style={{
                  backgroundColor: 'transparent',
                  color: '#fff',
                  fontWeight: '900',
                }}>Sign In</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}