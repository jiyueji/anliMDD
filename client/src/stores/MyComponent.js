import React, { Component } from 'react'
import { useOktaAuth } from '@okta/okta-react';

export default class MyComponent extends Component {
  render() {
    const { authState } = useOktaAuth();
    if (authState.isPending) {
      return <div>Loading...</div>;
    }
    if (authState.isAuthenticated) {
      return <div>Hello User!</div>;
    }
    return <div>You need to login</div>;
  }

};