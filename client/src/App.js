import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import routes from './routes'
import Header from './components/Header'
import logo from './logo.svg'
import './styles/style.css'
import './styles/table.css'


@inject('authStore') @observer
class App extends Component {

    // async componentDidMount() {
    //     await this.props.authStore.fetchProfile()
    // }

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
                <Header current_user={authStore.currentUser} logout={this.logoutHandler} />
                {this.props.children}
            </main>
        );
    }
}

export default App;
