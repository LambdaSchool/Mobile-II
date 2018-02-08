import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    height: 25,
    width: 240,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * .4,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },
  todoInput: {
    backgroundColor: 'white',
    height: 50,
    width: width * .64,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20
  },
  itemInput: {
    flex: 1,
    width: 200,
  },
  todoList: {
    alignSelf: 'center',
    alignContent: 'flex-start',
    width: width * .64
  },
  todo: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * .64,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 6,
    paddingBottom: 6,
  },
  todoCom: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * .64,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 6,
    paddingBottom: 6,
    backgroundColor: 'green'
  },
  todoText: {
    fontSize: 16,
  },
  todoImage: {
    height: 15,
    width: 15,
    margin: 8
  },
  top: {
    height: 40,
    backgroundColor: 'blue'
  },
  topIcon: {
    height: 20,
    width: 20
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  input: {
    height: 40,
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    height: height * .5,
    maxWidth: width * .5,
  },
  button: {
    maxWidth: width * .5,
  },
  mainImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: height * .3,
    width: width * .5
  },
  form: {
    marginTop: height * .3,
    height: height * .2,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'flex-start',
    width: width * .5
  }
});