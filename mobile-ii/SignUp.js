import React, { Component } from 'react';
import { View, TextInput, Button, Modal, Text, Image, AsyncStorage } from 'react-native';
import { signUp, errorAction, clearError } from './actions';
import { connect }from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Styles';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Sign Up",
      headerRight: (
        <Image
          source={{ uri: 'http://downloadicons.net/sites/default/files/halloween-black-cat-icon-72559.png' }}
          style={styles.topIcon}
        />
      ),
    };
  };
  handleSubmit() {
    const { email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) return this.props.errorAction('Password\'s must match!!');
    if (email.indexOf('@') > email.indexOf('.') && email.indexOf('.') !== email.length - 1 && email.length > 4) {
      return this.props.errorAction('Not a valid email address!!');
    }
    this.props.signUp(email, password);
  };

  render() {
    return (
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}  
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}  
        />
        <TextInput 
          style={styles.input}
          placeholder="confirmPassword"
          secureTextEntry={true}
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}  
        />
        <Button 
          color='black'
          style={styles.button}
          title="Sign Up"
          onPress={this.handleSubmit}
        />
        <Modal
          animationType="slide"
          transparent={true}
          onShow={() => setTimeout(() => this.props.clearError(), 2000)}
          visible={this.props.error.isError}
          onRequestClose={() => this.props.clearError()}
          >
          <View style={styles.modal}>
          <Text>{this.props.error.message}</Text>
          </View>
        </Modal>
    </View>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    error: state.error
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ signUp, errorAction, clearError }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);