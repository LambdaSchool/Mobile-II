import React, { Component } from 'react';
import {
	View,
	TouchableOpacity,
	Image,
	Text
} from 'react-native';

export default class Todo extends Component {

	markComplete = (e) => this.props.markComplete(e, this.props.item);
	delete = (e) => this.props.delete(e, this.props.item);

  render() {
    return (
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
	  			<TouchableOpacity
	  				onPress={this.markComplete}
	  				style={{
	  					height: 30,
	  					width: 30,
	  					marginLeft: 10,
	      			borderRadius: 2.5,
	      			backgroundColor: '#8196E2',
	      			shadowColor: '#000',
					    shadowOffset: { width: 2, height: 3 },
					    shadowOpacity: 0.25,
					    shadowRadius: 2.5,
					    justifyContent: 'center',
					    alignItems: 'center'
	  				}}>
	  				{
	  					this.props.item.completed &&
	  					<Image
		  					style={{ height: 20, width: 20 }} 
		  					source={require('../../public/check.png')} />
	  				}
	  			</TouchableOpacity>
	  			<Text style={{
	  				backgroundColor: 'transparent',
	  				color: '#fff'
	  			}}>{this.props.item.todo}</Text>
	  			<TouchableOpacity
	  				style={{
	  					height: 30,
	  					width: 30,
	  					marginLeft: 10,
	      			borderRadius: 30/2,
	      			backgroundColor: '#F94054',
	      			shadowColor: '#000',
					    shadowOffset: { width: 2, height: 3 },
					    shadowOpacity: 0.25,
					    shadowRadius: 2.5,
					    justifyContent: 'center',
					    alignItems: 'center'
	  				}}
	  				onPress={this.delete}>
	  				<Image
	  					style={{ height: 20, width: 20 }} 
	  					source={require('../../public/close.png')} />
	  			</TouchableOpacity>
	  		</View>
	  	</View> 
    );
  }
}
