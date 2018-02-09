import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoContainer: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navContainer: {
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    buttonWrapper: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
    },
    button: {
        marginRight: 10,
    },
    formWrapper: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formHeader: {
        fontSize: 30,
        marginBottom: 5,
    },
    formText: {
        fontSize: 16,
        marginBottom: 10,
    },
    instructions: {
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 10,
    },
    shortInput: {
        paddingLeft: 8,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        textAlign: 'left',
        alignItems: 'center',
        borderColor: '#0077CC',
        borderWidth: 2,
        borderRadius: 12,
        underlineColorAndroid: 'transparent',
        marginTop: 10,
        marginBottom: 10,
    },
    contentList: {
        height: '100%',
    },
    textFont: {
        fontSize: 28
    },
    inputBox: {
        width: 300,
        height: 40,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 40,
    },
    incomplete: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 40,

    },
    completed: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: '900',
        textDecorationLine: 'line-through',
        fontStyle: 'italic',
        lineHeight: 40,
    },

});