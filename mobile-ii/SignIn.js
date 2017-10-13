import React, { Component } from 'react';
import { View, TextInput, Button, Modal, Text, Image, AsyncStorage } from 'react-native';
import { signIn, clearError } from './actions';
import { connect }from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Styles';


class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Sign In To View Content",
      headerRight: (
        <Image
          source={{ uri: 'http://downloadicons.net/sites/default/files/halloween-black-cat-icon-72559.png' }}
          style={styles.topIcon}
        />
      ),
    };
  };
  handleSubmit() {
    const { email, password } = this.state;
    this.props.signIn(email, password);
    console.log(this.props)
  }
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
        <Button 
          color='black'
          style={styles.button}
          title="Sign In"
          onPress={this.handleSubmit}
        />
        <Modal
          animationType="slide"
          transparent={true}
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ signIn, clearError }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);