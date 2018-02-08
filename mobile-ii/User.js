import React, { Component } from 'react';
import { View, TextInput, Button, Image, Text, TouchableHighlight, FlatList, AsyncStorage } from 'react-native';
import { signedIn, todo } from './actions';
import { connect }from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import styles from './Styles';

class User extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  };
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: 'My To Dos',
      headerRight: (
        <Image
          source={{ uri: 'http://downloadicons.net/sites/default/files/halloween-black-cat-icon-72559.png' }}
          style={styles.topIcon}
        />
      ),
    };
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalCharge) this.props.navigation.setParams({ user });
  };
  componentDidMount() {
    this.props.signedIn(false);
  };
  handleSubmit(text) {
    this.props.todo(text, 'submit');
  };
  handleChange(id) {
    this.props.todo(id, 'change');
  };
  handleDelete(id) {
    this.props.todo(id, 'delete');
  };
  _keyExtractor = (item, index) => item._id;  
  render() {
    return (
      <View>
        <View style={styles.todoInput}>
          <TextInput
            transparent={true}
            style={styles.itemInput}
            placeholder="Enter Item"
            returnKeyType='send'
            onSubmitEditing={(e) => this.handleSubmit(e.nativeEvent.text)}
          />
        </View>
        <FlatList
          style={styles.todoList}
          data={this.props.user.user.todos}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>  {
            return (
              <TouchableHighlight 
                activeOpacity={.5}
                underlayColor='transparent'
                onPress={() => this.handleChange(item._id)}
              >
              <View style={item.completed === true ? styles.todoCom : styles.todo }>
                <Text
                  style={styles.todoText}
                >
                  {item.text}
                </Text>
                <TouchableHighlight onPress={() => this.handleDelete(item._id)}>
                  <Image
                    style={styles.todoImage}
                    source={{ uri: 'http://www.iconsdb.com/icons/preview/black/delete-2-xxl.png' }}
                  />
                </TouchableHighlight>
              </View>
            </TouchableHighlight> 
          );
        }}
        />
      </View>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ signedIn, todo }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);