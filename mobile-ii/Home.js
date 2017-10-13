import React, { Component } from 'react';
import { Button, View, AsyncStorage, Image } from 'react-native';
import { nav, signedIn } from './actions';
import { connect }from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import styles from './Styles';


class Home extends Component {
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
  componentDidMount() {
   this.props.signedIn(true);
  };
  render() {
    return (
      <View style={styles.buttonContainer}>
        <Image 
          source={{ uri: 'https://1001freedownloads.s3.amazonaws.com/icon/thumb/336947/Cat-icon.png' }}
          style={styles.mainImage}
        />
        <Button
          color='black'
          style={styles.button}
          onPress={() => this.props.nav('SignIn')}
          title="Sign In"
        />
        <Button
          color='black'
          style={styles.button}
          onPress={() => this.props.nav('SignUp')}
          title="Sign Up"
        />
      </View>
    );
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ nav, signedIn }, dispatch);

export default connect(null, mapDispatchToProps)(Home);