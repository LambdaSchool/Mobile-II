import React from 'react';
import {
  AsyncStorage,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

import Header from '../components/Header';
import Container from '../components/Container';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false
    };
    this.signUp = this.signUp.bind(this);
  }

  static navigationOptions = () => {
    return {
      header: <Header style={{ height: height * 0.4 }} size={200} />
    };
  };

  async signUp() {
    try {
      const res = await axios.post(
        'https://mobile-server-ii.herokuapp.com/users',
        { email: this.state.email, password: this.state.password }
      );
      if (res.data.code === 11000) {
        return this.setState({
          error: true,
          errorMessage: 'Sorry, that email is already in use.'
        });
      }
      if (res.data.token) {
        await AsyncStorage.setItem('token', res.data.token);
        this.props.navigation.navigate('TodoList', {
          token: res.data.token
        });
      }
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }
  }

  closeModal() {
    this.setState({ error: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Container>
          <Icon color="#f6d54a" name="person-pin" />
          <TextInput
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            style={styles.textInput}
            value={this.state.email}
          />
        </Container>
        <Container>
          <Icon color="#f6d54a" name="lock" />
          <TextInput
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
            style={styles.textInput}
            value={this.state.password}
          />
        </Container>
        <TouchableHighlight
          onPress={this.signUp}
          style={styles.button}
          underlayColor="#feffff"
        >
          <Text style={styles.text}>SIGN UP</Text>
        </TouchableHighlight>
        <Modal
          animationType="fade"
          onShow={() => setTimeout(() => this.closeModal(), 1500)}
          transparent={true}
          visible={this.state.error}
        >
          <View style={styles.modal}>
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181819',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 56
  },
  textInput: {
    height: 50,
    fontFamily: 'Circular Book',
    fontSize: 28,
    color: '#f6d54a',
    backgroundColor: '#181819',
    paddingLeft: 16,
    width: width * 0.8
  },
  button: {
    height: 40,
    width: width * 0.67,
    backgroundColor: '#f6d54a',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32
  },
  text: {
    color: '#181819',
    fontFamily: 'Circular Bold',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2
  },
  modal: {
    height: height,
    width: width,
    backgroundColor: '#f6d54a',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  errorMessage: {
    fontFamily: 'Circular Bold',
    fontSize: 16,
    color: '#181819',
    alignSelf: 'center'
  }
});
