import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        color: 'red',
        fontSize: 20,
    },
    buttonContainer: {
        borderRadius: 10,
        padding: 10,
    },
    inputStyles: {
        color:'red',
        borderWidth: 1,
        borderColor: '#000000',
        width: '90%',
        height: 40,
        marginBottom: 15,
        paddingRight: 10,
        paddingLeft: 10
      },
  });

  export default styles;