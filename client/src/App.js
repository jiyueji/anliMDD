import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import routes from './routes'
import Header from './components/Header'
import logo from './logo.svg'
import './styles/style.css'
import './styles/table.css'

import { Router, Switch, Route } from 'react-router'
import Modify from './containers/Modify'
import HeaderLoad from './containers/HeaderLoad'

@inject('authStore') @observer
class App extends Component {

    // async componentDidMount() {
    //     await this.props.authStore.fetchProfile()
    // }

    async componentDidMount() {
        await this.props.authStore.login({
            username: 'user',
            password: 'password'
        })
    }

    logoutHandler = async () => {
        await this.props.authStore.logout()
    }

    render() {
        const authStore = this.props.authStore


        // console.log('TEST Auth Store: ', authStore.currentUser)

        if (authStore.isLoading) {
            // loading state
            return <p>Loading...</p>
        }
        return (
            <main>
                {/* {authStore.currentUser && <Header current_user={authStore.currentUser} logout={this.logoutHandler} />} */}
                {/* Header为登录的页面 */}
                <Header current_user={authStore.currentUser} logout={this.logoutHandler} />
                {/* HeaderLoad为loading页面 */}
                {/* {
                    authStore.isAuthenticated ? "" : <HeaderLoad />
                } */}
                {this.props.children}
            </main>
            // <Router>
            //     <Route path="/" component={AAA} />
            // </Router>
        );
    }
}

export default App;


// import React, { Component } from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
// import Home from './containers/Home'
// import Protected from './containers/Protected';

// class App extends Component {
//     render() {
//         return (
//             // <div>
//             //     111
//             // </div>
//             <Router>
//                 <Security issuer='https://dev-894950.okta.com'
//                     clientId='0oae6e0fxQfXsVdde4x6'
//                     redirectUri={'http://localhost:3000/implicit/callback'}>
//                     <Route path='/' exact component={Home} />
//                     <SecureRoute path='/protected' component={Protected} />
//                     <Route path='/implicit/callback' component={LoginCallback} />
//                 </Security>
//             </Router>
//         );
//     }
// }

// export default App;
