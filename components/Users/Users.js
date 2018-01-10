import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
	AsyncStorage,
	Animated,
	TouchableOpacity
} from 'react-native';
import Axios from 'axios';
import UserStyles from './UserStyles';
import LinearGradient from 'react-native-linear-gradient';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	users: []
    }
    this.url = 'https://mobile-server-ii.herokuapp.com/users';
  }

  componentDidMount = () => {
  	AsyncStorage.getItem('MobileAuthToken').then((token) => {
		  Axios.get(this.url, {
		    headers: {
		      authorization: token, 
		    }
		  }).then((res) => {
		    console.log(res);
		    this.setState({ users: res.data });
		  }).catch(err => console.log(err));
		});
  }

  render = () => {
    return (
      <View style={UserStyles.container}>
      	<LinearGradient
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          colors={['#ff5f6d', '#ffc371']}>
      		<Text style={UserStyles.heading}>Users</Text>
      		<FlatList
      			style={{
      				height: '100%',
      				width: '100%',
      				borderTopWidth: 1,
							borderTopColor: '#FFFFFF',
							borderBottomWidth: 1,
							borderBottomColor: '#FFFFFF',
      			}} 
      			data={this.state.users}
      			renderItem={({item}) => (
					  	<View 
					  		style={{
							  	width: '100%',
							  	height: 45,
							  	borderBottomWidth: 1,
							  	borderBottomColor: '#FFFFFF',
							  	backgroundColor: 'transparent',
							  	justifyContent: 'center',
							  	alignItems: 'center',
							  }}>
					  		<View 
					  			style={{
					  				width: '90%',
					  				height: '100%',
					  				justifyContent: 'space-between',
					  				alignItems: 'center',
					  				flexDirection: 'row'
					  			}}>
					  			<Image
					  				style={{height: 30, width: 30}}
					  				source={require('../../public/person.png')} />
					  			<Text style={{
					  				backgroundColor: 'transparent',
					  				color: '#fff'
					  			}}>{item.email}</Text>
					  			<View style={{
					  				backgroundColor: '#fff',
					  				height: 30,
					  				width: 30,
					  				borderRadius: 30/2,
					  				justifyContent: 'center',
					  				alignItems: 'center'
					  			}}>
					  				<Text style={{
					  					backgroundColor: 'transparent',
					  					color: '#FC2E43'
					  				}}>{item.todos.length}</Text>
					  			</View>
					  		</View>
					  	</View>
					  )}
					  keyExtractor={(item, index) => index} />
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('Todos')}
						style={{
							height: 45,
							marginTop: 20,
							marginBottom: 20,
							borderColor: '#fff',
							borderWidth: 2,
							borderRadius: 22.5,
							width: '85%',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<View>
							<Text
								style={{
									backgroundColor: 'transparent',
									color: '#fff'
								}}>My Todos</Text>
						</View>
					</TouchableOpacity>
      	</LinearGradient>
      </View>
    );
  }
}