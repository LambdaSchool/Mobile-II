import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { connect } from "react-redux";
import { getStoredToken, signOut } from "./Auth/AuthActions";
class Home extends React.Component {
  componentDidMount() {
    this.props.getStoredToken();
  }

  signOut = () => {
    this.props
      .signOut()
      .then(() => {
        Alert.alert("Sign Out successful", "You were signed out.", [
          { text: "OK" }
        ]);
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Sign Out failed", "Sign out failed.", [{ text: "OK" }]);
      });
  };

  goToSignIn = () => {
    this.props.navigation.navigate("SignIn");
  };
  goToSignUp = () => {
    this.props.navigation.navigate("SignUp");
  };
  goToContent = () => {
    this.props.navigation.navigate("Content");
  };
  goToTodos = () => {
    this.props.navigation.navigate("Todos");
  }

  renderAuthenticatedButtons = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ paddingBottom: 10 }}>
        <Button onPress={this.goToContent} title="Content" />
      </View>
      <View style={{ paddingBottom: 10 }}>
        <Button onPress={this.goToTodos} title="Todos" />
      </View>
      <View style={{ paddingBottom: 10 }}>
        <Button onPress={this.signOut} title="Sign Out" />
      </View>
    </View>
  );

  renderUnauthenticatedButtons = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ paddingBottom: 10 }}>
        <Button onPress={this.goToSignIn} title="Sign In" />
      </View>
      <Button onPress={this.goToSignUp} title="Sign Up" />
    </View>
  );

  render() {
    if (this.props.authentication.token) return this.renderAuthenticatedButtons();
    return this.renderUnauthenticatedButtons();
  }
}
const mapStateToProps = state => {
  return {
    authentication: state.authentication
  };
};

const mapDispatchToProps = { getStoredToken, signOut };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
