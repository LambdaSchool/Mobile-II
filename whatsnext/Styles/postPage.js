import { StyleSheet, Dimensions } from 'react-native';
let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold'
  },
});

export default styles;