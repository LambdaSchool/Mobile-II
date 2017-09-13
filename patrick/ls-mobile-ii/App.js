import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Content from './Content';

const { width, height } = Dimensions.get('window');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToContents = this.navigateToContents.bind(this);
  }

  static navigationOptions = {
    title: 'You\'re HOME',
  }

  navigateToContents(route) {
    this.props.navigation.navigate(route);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://media.tenor.com/images/7f7f2882899755a705a2953b6fcfc263/tenor.gif' }}
          style={{ height: height, width: width, resizeMode: 'stretch' }}
          >
          <View style={styles.buttonList}>
            <Button
              style={styles.button}
              title={'SignIn'}
              onPress={() => {
                this.props.navigation.navigate('SignIn');
                // navigateToContents('SignIn');
              }} />
            <Button
              style={styles.button}
              title={'SignUp'}
              onPress={() => {
                this.props.navigation.navigate('SignUp');
                // navigateToContents('SignUp');
              }} />
            {/* <Button
              style={styles.button}
              title={'Are You Authorized To View This Content, Agent Smith?'}
              onPress={() => {
                this.props.navigation.navigate('Content');
                // navigateToContents('Content');
              }} /> */}

          </View>
          <Image
            style={{ height: height / 2, width: width, opacity: 1 }}
            source={{uri: 'https://static.giantbomb.com/uploads/original/15/155745/2179153-18079_26016.gif'}}
          />
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonList: {
    alignItems: 'center',
    opacity: .8,
  },
  button: {
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 20,
  },
});

const Routes = StackNavigator({
  Home: { screen: Home },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Content: { screen: Content },
});

export default Routes;
