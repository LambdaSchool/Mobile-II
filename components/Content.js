import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
class Content extends React.Component {
  render() {
    console.log('authentication state:');
    console.log(this.props.authentication);
    if (!this.props.authentication.token) return <View><Text>Not Authenticated</Text></View>;
    return <View><Text>Authenticated</Text></View>;
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Content);