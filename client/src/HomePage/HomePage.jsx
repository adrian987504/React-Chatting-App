
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

import ChatView from 'react-chatview';
import { userActions } from '../_actions';

import Messages from './Messages';
import ChatInput from './ChatInput';
import './ChatApp.css';
import './App.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: localStorage.getItem('email'),
    };
    this.socket = openSocket('http://localhost:8000');
  }

  componentDidMount() {
    this.socket.on('connect', () => {
      const { accessToken } = this.props.user.data;
      this.socket.emit('init', { accessToken });
    });

    this.socket.on('init', this.initialize.bind(this));
		this.socket.on('send:message', this.messageRecieve.bind(this));
		this.socket.on('user:join', this.userJoined.bind(this));
    this.socket.on('user:left', this.userLeft.bind(this));
    
    fetch('http://localhost:7777/message')
      .then(response => response.json())
      .then(data => {
        this.setState({ messages: data.data });
      });
  }

  initialize(data) {
		var {users, name} = data;
		this.setState({users, user: name});
	}

	messageRecieve(message) {
    this.addMessage(message);
	}

	userJoined(data) {
		var {users} = this.state;
		var {name} = data;
    users.push(name);
		this.setState({users: [...users, name]});
    this.addMessage({
			user: 'APPLICATION BOT',
      body : name +' Joined',
      fromMe: true
    });
  }

  addMessage(msg) {
		var {messages} = this.state;
		this.setState({messages: [...messages, msg]});
  }
	userLeft(data) {
		var {users, messages} = this.state;
		var {name} = data;
		var index = users.indexOf(name);
		users.splice(index, 1);
    this.setState({users});
    this.addMessage({
			user: 'APPLICATION BOT',
			body : name +' Left',
      fromMe: true
		})
  }
  
  onSendMessage(message) {
    const {username} = this.state;
    console.log({text: message, author: username});
    this.socket.emit('send:message', {text: message, author: username});
    this.addMessage({author: username, body: message, fromMe: username});
  }

  render() {
    // const { user } = this.props;
    return (
      <div className="container">
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.onSendMessage.bind(this)} />
        <p><Link to="/login">Logout</Link></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication: { user } } = state;
  return { user };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
