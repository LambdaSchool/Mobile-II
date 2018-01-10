import React, { Component } from 'react';
import {
	View,
	Animated,
	TouchableOpacity,
	AsyncStorage,
	FlatList,
	Text,
	Image
} from 'react-native';
import AddTodo from './AddTodo';
import Todo from './Todo';
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios';
import Styles from './Styles';
import update from 'immutability-helper';

export default class Todos extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		todos: []
  	}
  	this.url = 'https://mobile-server-ii.herokuapp.com/todos';
  }

  componentDidMount = () => {
  	AsyncStorage.getItem('MobileAuthToken').then((token) => {
		  Axios.get(this.url, {
		    headers: {
		      authorization: token, 
		    }
		  }).then((res) => {
		    console.log(res);
		    this.setState({ todos: res.data });
		  }).catch(err => console.log(err));
		});
  }

  addTodo = (todo) => {
    const s = this.state.todos;
    const ns = update(s, { $push: [ {todo: todo, completed: false, id: s.length} ] });
    this.setState({ todos: ns });
  }

  markComplete = (e, item) => {
    let i; let c; const s = this.state.todos;
    s.forEach((todo, index) => {
      if(todo.id === item.id) {
        i = index;
        c = todo.completed;
      }
    });
    const ns = update(s, {[i]: {completed: {$set: !c}}});
    this.setState({ todos: ns });
  }

  delete = (e, item) => {
    let i; const s = this.state.todos;
    s.forEach((todo, index) => {
      if(todo.id === item.id) i = index;
    });
    const ns = update(s, {$splice: [[i, 1]]});
    this.setState({ todos: ns });
  }

  render = () => {
    return (
    	<View style={Styles.container}>
    		<LinearGradient
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          colors={['#ff5f6d', '#ffc371']}>
          <AddTodo 
          	addTodo={this.addTodo} />
          <FlatList 
          	style={{
      				height: '100%',
      				width: '100%',
      				borderTopWidth: 1,
							borderTopColor: '#FFFFFF',
      			}} 
      			data={this.state.todos}
      			renderItem={({item}) => (
					  	<Todo 
					  		item={item}
					  		delete={this.delete}
					  		markComplete={this.markComplete} />
					  )}
					  keyExtractor={(item, index) => index} />
        </LinearGradient>
    	</View>    
    );
  }
}
