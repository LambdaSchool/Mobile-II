import React, { Component } from 'react';
import {
	Animated,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';

export default class AddTodo extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		text: ''
  	}
  }

  submit = () => {
  	const { text } = this.state;
  	if(text !== '' && text !== ' ') {
  		this.props.addTodo(text);
      this.setState({text: ''});
  	}
  }

  render = () => {
    return (
    	<TouchableWithoutFeedback 
    		onPress={Keyboard.dismiss}
    		style={{width: '100%', justifyContent: 'center', alignItems:'center'}}>
    		<View
    			style={{width: '100%', justifyContent: 'center', alignItems:'center'}}>
    			<TextInput
    				value={this.state.text}
    				onFocus={this.focus}
    				onBlur={this.blur}
    				onChangeText={text => this.setState({text})}
    				placeholder="Add Todo"
    				placeholderTextColor='#fff'
    				style={{
    					width: '85%',
    					height: 45,
    					borderBottomColor: "#fff",
    					borderBottomWidth: 2,
    					marginBottom: 20,
    					color: "#fff"
    				}} />
    			<TouchableOpacity
    				onPress={this.submit}
    				style={{
    					width: '85%',
    					height: 45,
    					borderColor: "#fff",
    					borderWidth: 2,
    					borderRadius: 22.5,
    					justifyContent: 'center',
    					alignItems: 'center',
    					marginBottom: 20
    				}}>
    				<Text
    					style={{
    						color: '#fff',
    						backgroundColor: 'transparent'
    					}}>Add Todo</Text>
    			</TouchableOpacity>
    		</View>
    	</TouchableWithoutFeedback>    
    );
  }
}
