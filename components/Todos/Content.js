import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { fetchUsers } from './TodoActions';

class Content extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const { token } = this.props.authentication;
    const { users, isPending } = this.props.todos;
    if (!token) return <View><Text>Not Authenticated</Text></View>;
    if (isPending) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if (!users || !users.length) return <View><Text>No users</Text></View>;

    const userWithKeys = users.map((user,i) => { 
      user.key = `u${i}`; 
      return user; 
    });
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList 
          data={userWithKeys}
          renderItem={({item, index}) => {
            return (
              <Text> User {index + 1}: {item.email}</Text>
            )
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    todos: state.todos
  };
}

const mapDispatchToProps = { fetchUsers };

export default connect(mapStateToProps, mapDispatchToProps)(Content);