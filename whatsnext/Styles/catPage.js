import { StyleSheet, Dimensions } from 'react-native';
let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  navContainer: {
    flexDirection:'row',
  },
  textBox: {
    borderColor: 'black',
    backgroundColor: 'beige',
    borderWidth: 1,
    paddingLeft: 3,
    paddingRight: 3,
    height: 35,
    width: 350,
    marginTop: 30,
    marginBottom:5,
    marginLeft:15,
    borderRadius: 5
  },
  icons: {
    height:35,
    width:35,
    marginTop: 30,
    marginLeft: 5
  },
  photos: {
    height: 150,
    width: width
  },
  imageContainer:{
    flexDirection: 'row'
  },
  texts: {
    borderBottomWidth: 1/2,
    borderLeftWidth:1/2,
    borderRightWidth: 1/2,
    borderColor: 'black',
    paddingLeft:5,
    paddingRight: 5,
  },
  header:{
    textAlign: 'center',   
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  smallPhotos: {
    height: 100,
    width: width/2,
    borderWidth:1/2,
    resizeMode:'contain',
    borderColor: 'black',
  }
});

export default styles;