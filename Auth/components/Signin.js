import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'; 
import axios from 'axios';
import { StackNavigator } from 'react-navigation';

const apiUrl = 'https://mobile-server-ii.herokuapp.com/'

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
        }
    }
    handleUsernameInput = (e) =>{
        this.setState({
            email: e
        })
    }
    handlePasswordInput = (e) =>{
        this.setState({
            password:e
        })
    }

    signin= async() =>{
       const email = this.state.email;
       const password = this.state.password;
       try {
           let signinrequest = await axios.post('https://mobile-server-ii.herokuapp.com/signin', {email,password})
           let token = signinrequest.data.token; 
           try{
               await AsyncStorage.setItem('token', token);
           } catch (error){
               console.log(error)
           }
           this.props.navigation.navigate('Content');
        } catch (error){
           console.log(error)
       }
       this.setState({
        email:'',
        password:'',
        })
    }
    render(){
        return(
            
            <View style={body}>
                <View style={Formwrapper}>
                    <FormLabel labelStyle={{color:'black',fontSize:14}} >Email</FormLabel>
                    <FormInput inputStyle={{color:'black',fontSize:14 }}  onChangeText={this.handleUsernameInput}/>
                    <FormLabel labelStyle={{color:'black',fontSize:14}}>Password</FormLabel>
                    <FormInput  textInputRef='password'  secureTextEntry={true} inputStyle={{color:'black',fontSize:14 }} onChangeText={this.handlePasswordInput}/>
                    <FormValidationMessage>Error message</FormValidationMessage>
                    <TouchableOpacity style={button} onPress={() => this.signin()}>
                        <Text style={buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    button: {
        flex:0,
        width: '100%',
        height:50,
        backgroundColor: '#e50914',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25
    },
    buttonText :{
        color:'white',
    },
    Formwrapper:{
        flex:0,
        width: '70%',
    },
    body:{
        flex: 1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });

const {button, buttonText,body, Formwrapper} = styles


export default SignIn;