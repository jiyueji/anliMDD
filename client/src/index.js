import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';
// import history from './services/history'
import App from './App'
import Home from './containers/Home'
import loginOkta from './containers/loginOkta'
import MessageList from './containers/MessageList'
import Modify from './containers/Modify'
import Protected from './containers/Protected';
import authStore from './stores/AuthStore'
import userStore from './stores/UserStore'
import searchStore from './stores/SearchStore'
import registerStore from './stores/RegisterStore'
import chartStore from './stores/ChartStore'
import chartStoreAbo from './stores/ChartStoreAbo'
import chartStoreGrowth from './stores/ChartStoreGrowth'
import chartStoreDaily from './stores/ChartStoreDaily'
import chartStoreSocial from './stores/ChartStoreSocial'
import chartRemarks from './stores/chartRemarks'
import * as serviceWorker from './registerServiceWorker';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
// var OktaAuth = require('@okta/okta-auth-js');
const history = createBrowserHistory() // hash模式l
const stores = {
    authStore,
    userStore,
    searchStore,
    registerStore,
    chartStore,
    chartStoreAbo,
    chartStoreGrowth,
    chartStoreDaily,
    chartStoreSocial,
    chartRemarks
};

const oktaAuth = new OktaAuth({
    // issuer: 'https://amway.okta.com/oauth2/default',
    // clientId: '0oa1k0h0d4rDMG7x30h8',
    // redirectUri: 'https://idashboard.intranet.local/implicit/callback',
    // issuer: 'https://dev-5735355.okta.com',
    // clientId: '0oa1matn1QXLPKAaI5d6',
    // redirectUri: 'http://localhost:3000/implicit/callback',
    issuer: 'https://amway.okta.com',
    clientId: '0oa1k0h0d4rDMG7x30h8',
    redirectUri: 'https://idashboard.intranet.local/implicit/callback',
    // responseMode:'fragment',
    responseType:['token', 'id_token'],//['token', 'id_token'],'code'
    prompt:'none',
    scopes: ['openid', 'profile', 'email'],//['openid', 'profile', 'email']是OpenID Connect中的保留范围，可让您访问用户的数据。
    pkce: true,
    // tokenManager: {
    //     storage: 'cookie',//您可以传递对象或字符串。如果传递对象，则应满足自定义存储提供程序的要求。传递字符串以指定内置存储类型之一：localStorage\sessionStorage\cookie（默认）\memory：简单的内存存储提供程序
    //     secure: false, //如果为true，则SDK将在所有cookie上设置“安全”选项。当此选项true为时，如果应用程序源未使用HTTPS协议，则将引发异常。设置为false允许在HTTP起源上设置cookie，
    //     autoRenew: true,//默认情况下，库将尝试续订过期的令牌。当库请求过期的令牌时，将执行续订请求以更新令牌。如果您希望禁用令牌的自动更新，请将autoRenew设置为false。
    //     expireEarlySeconds: 120,//如果autoRenew设置为true，则使用进行访问时，令牌将在过期后的30秒内更新tokenManager.get()。您可以通过设置expireEarlySeconds选项来自定义该值。该值应足够大，以解决客户端与Okta服务器之间的网络延迟。
    // }
});

const customAuthHandler = (oktaAuth) => {
    history.push('/protected');
};

ReactDOM.render(
    <Provider {...stores}>
        <App>
            <Router history={history}>
                <Security oktaAuth={oktaAuth} onAuthRequired={customAuthHandler}>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/modify' exact component={Modify} />
                        <Route path='/implicit/callback' component={LoginCallback} />
                        <SecureRoute path='/protected' component={Protected} />
                        <Redirect path='*' to="/" />
                    </Switch>
                </Security>
            </Router>
        </App>
    </Provider >,
    document.getElementById('root')
);

serviceWorker.unregister();