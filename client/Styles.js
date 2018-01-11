import { StyleSheet }  from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(105, 52, 60)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    color: '#789',
    fontSize: 26
  },
  navbtn: {
    marginTop: 10,
    backgroundColor: '#678',
    padding: 10,
    width: 180
  },
  navbtntext: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center'
  },
  input: {
    height: 40,
    width: 200,
    marginTop: 10,
    borderColor: 'gray', 
    borderWidth: 2,
    fontSize: 26,
    paddingLeft: 5,
    paddingRight: 5,
    color: '#fff'
  },
  textItem: {
    color: '#fff',
    fontSize: 20
  }
});

export default styles;