import React, { Component } from 'react'
import { withOktaAuth } from '@okta/okta-react';
import {Redirect } from 'react-router-dom';
/**
 * Home page extra component
 */
async function checkUser() {
    if (this.props.authState.isAuthenticated && !this.state.userInfo) {
      const userInfo = await this.props.authService.getUser();
      if (this._isMounted) {
        this.setState({ userInfo });
      }
    }
  }

export default withOktaAuth(class loginOkta extends Component {

        _isMounted = false;

        constructor(props) {
            super(props)
            this.login = this.login.bind(this);
            this.logout = this.logout.bind(this);
            this.state = {
                userInfo: null,
            }
        }
        async login() {
            this.props.oktaAuth.signInWithRedirect("/");
          }
          async logout() {
            this.props.oktaAuth.signOut('/');
          }
        render() {
            if (this.props.authState.isPending) return <div>Loading...</div>;
            return this.props.authState.isAuthenticated ?
                <Redirect to={{ pathname: '/' }}/> :
                <button onClick={this.login}>Login</button>;
        }
    })
