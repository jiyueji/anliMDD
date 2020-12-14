import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: null
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:{serverPort}/api/messages', {
        headers: {
          Authorization: 'Bearer ' + this.props.authState.accessToken
        }
      });
      const data = await response.json();
      this.setState({ messages: data.messages });
    } catch (err) {
      // handle error as needed
    }
  }

  render() {
    if (!this.state.messages) return <div>Loading...</div>;
    const items = this.state.messages.map(message =>
      <li key={message}>{message}</li>
    );
    return <ul>{items}</ul>;
  }
});