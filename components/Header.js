import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppLoading } from 'expo';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = { ready: false };
  }

  async componentWillMount() {
    try {
      await Expo.Font.loadAsync({
        'Material Icons': require('../assets/fonts/MaterialIcons.ttf')
      });
    } catch (err) {
      console.warn(err.message);
    } finally {
      this.setState({ ready: true });
    }
  }

  render(props) {
    const { style, size } = this.props;
    if (this.state.ready) {
      return (
        <View style={[style ? style : '', styles.header]}>
          <Icon
            color="#f6d54a"
            name="check-circle"
            size={size ? size : 300}
            style={{ marginBottom: 20 }}
          />
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#181819',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 72
  }
});
