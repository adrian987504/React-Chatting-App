import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

import ChatView from 'react-chatview';
import { userActions } from '../_actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: '',
    };
    this.socket = openSocket('http://localhost:8000');
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());

    this.socket.on('init', this.initialize.bind(this));
		this.socket.on('send:message', this.messageRecieve.bind(this));
		this.socket.on('user:join', this.userJoined.bind(this));
		this.socket.on('user:left', this.userLeft.bind(this));
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
			text : name +' Joined'
    });
  }

  addMessage(msg) {
		var {messages} = this.state;
		this.setState({messages: [msg, ...messages]});
  }
	userLeft(data) {
		var {users, messages} = this.state;
		var {name} = data;
		var index = users.indexOf(name);
		users.splice(index, 1);
    this.setState({users});
    this.addMessage({
			user: 'APPLICATION BOT',
			text : name +' Left'
		})
	}
  
  loadMoreHistory () {
    return new Promise((resolve, reject) => {
      let more = _.range(20).map(v=>'yo');
      this.setState({ messages: this.state.messages.concat(more)});
      resolve();
    });
  }

  onSendMessage() {
    const {user, text} = this.state;
    this.socket.emit('send:message', {text});
    this.addMessage({user, text});
    this.setState({text: ''});
  }

  render() {
    // const { user, users } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <ChatView 
          className="content"
          flipped={true}
          scrollLoadThreshold={50}
          onInfiniteLoad={this.loadMoreHistory.bind(this)}>
          {this.state.messages.map((msg, index) => 
            <div key={index}>
              {`${msg.user}: ${msg.text}`}
            </div>
          )}
        </ChatView>
        <input value = {this.state.text} onChange={(e) => this.setState({text: e.target.value})}></input>
        <button onClick={()=>this.onSendMessage()}>send</button>
        <p><Link to="/login">Logout</Link></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {user, users};
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
