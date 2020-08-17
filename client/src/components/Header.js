import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react'

import LoginForm from '../forms/LoginForm'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useStores } from '../services/StoreUtils'

/**
 * Header with greetings and links
 * @param {object} props 
 */
const Header = inject('authStore')(observer((props) => {

    const stores = useStores()
    const authStore = stores.authStore
    const registerStore = stores.registerStore

    const handleLogin = async (params) => {
        await authStore.login(params)
    }

    const handleRegister = async (params) => {
        await registerStore.register(params)
    }

    // TEMPORARY ADD AUTOLOGIN FEATURE
    // useEffect(() => {
    //     if (!authStore.isAuthenticated) {
    //         handleLogin({
    //             username: 'user',
    //             password: 'password'
    //         })    
    //     }
    // });

    return <header className="header">
        <div className="container-fluid">

            <Row>
                <Col md={{ span: 4 }}>
                    <div className="anliBinnerLogo"></div>
                    <div id="branding">
                        <a href="#">
                            <b>MD</b> iDashboard
                        </a>
                    </div>

                </Col>
                {/* 下面注释代码为原登录组件 */}
                <Col md={{ span: 5, offset: 3 }}>
                    {!authStore.isAuthenticated && <LoginForm handler={handleLogin} />}
                    {!authStore.isAuthenticated && <a href="/sign_up">Not registered? Sign up!</a>}


                    {authStore.isAuthenticated &&
                        <nav>
                            <ul>
                                <li className="current">
                                    {/* <a href="#">User {props.authStore.currentUser}</a> */}
                                </li>
                                <li>
                                    {/* <a href="#" onClick={(e) => { e.preventDefault(); props.logout(); }}>Log Out</a> */}
                                </li>
                            </ul>
                        </nav>
                    }


                    {/* { 
    props.authStore.currentUser &&  <nav>
    <ul>
        <li className="current">
            <a href="#">Account Settings {props.authStore.currentUser}</a>                                
        </li>
        <li>
            <a href="#" onClick={(e) => { e.preventDefault(); props.logout(); }}>Log Out</a>                                
        </li>
    </ul>
    </nav>                    
} */}

                </Col>
            </Row>

            <Row>
                <Col>
                    {authStore.isAuthenticated &&
                        <section id="showcase">
                            <div className="container-fluid">
                                <p className="welcome-back">
                                    {/* Welcome back <b>{props.current_user},</b> everything is looking <b>great!</b>  */}
                                </p>
                                {/* <p>
                                Your overall outlook is healthy with New ABOs especially strong. Total Buyers is a little weaker
                            </p> */}
                            </div>
                        </section>
                    }
                </Col>
            </Row>

        </div>

        {/* <p className="header__greeting">
            <span>
                Welcome
                <a className="header__link" href="">
                    {props.current_user}
                </a>
            </span>
        </p>
        <p className="header__logout">
            <a className="header__link" href="" onClick={(e) => { e.preventDefault(); props.logout(); }}>
                Logout
            </a>
        </p> */}


    </header>
}))

export default Header



