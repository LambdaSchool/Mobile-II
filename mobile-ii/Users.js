import React, { Component } from 'react';
import { View, FlatList, Image, AsyncStorage, Text } from 'react-native';
import { users } from './actions';
import { connect }from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import styles from './Styles';

class Users extends Component {
  componentDidMount() {
    this.props.users();
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "All Members",
      headerRight: (
        <Image
          source={{ uri: 'http://downloadicons.net/sites/default/files/halloween-black-cat-icon-72559.png' }}
          style={styles.topIcon}
        />
      ),
    };
  };
  _keyExtractor = (item, index) => item._id;
  render() {
    return this.props.user.users.length > 0 ? (
      <View>
        <FlatList
          data={this.props.user.users}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => <Text>{item.email}</Text>}
        />
      </View>
    ) : null;
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({users}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
