import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, AsyncStorage} from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';

const apiUrl = 'https://mobile-server-ii.herokuapp.com/'

class Content extends Component{
    constructor(props){
        super(props);
        this.state = {
            users : []
        }
        console.log(this.state)
    }
    async componentDidMount(){
        const token = await AsyncStorage.getItem('token');
        console.log(`In content.js ${token}`);
        if(token !== null){
            try {
                let allusers = await axios.get('https://mobile-server-ii.herokuapp.com/users',{headers: {
                    authorization: token, // attach the token as a header
                }});
                this.setState({
                    users : [...allusers.data]
                })
            } catch (error){
                console.log(error)
            }
        } else {
            this.setState({
                users : []
            })
        }
    }

    render(){
        
        return(
            <View>
                {this.state.users.length ? 
                <FlatList
                data={this.state.users}
                renderItem={({ item,key }) => {
                return (
                <View key= {item._id}>
                    <Text>
                    {item.email}
                    </Text>
                </View>
                );
                }}
            /> :
            <View>
                <Text>
                    No Auth Token
                </Text>
            </View> 
            }
                
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


export default Content;