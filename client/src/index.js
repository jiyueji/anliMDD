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
    issuer: 'https://dev-5735355.okta.com',
    clientId: '0oa1matn1QXLPKAaI5d6',
    redirectUri: 'http://localhost:3000/implicit/callback',
    // issuer: 'https://amway.okta.com',
    // clientId: '0oa1k0h0d4rDMG7x30h8',
    // redirectUri: 'https://idashboard.intranet.local/implicit/callback',
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
// console.log(oktaAuth,"oktaAuth")

// sessionStorage.setItem('https://idashboard.intranet.local', window.location.href);
// oktaAuth.token.parseFromUrl().then(function(res) {
//     console.log(res,"res")
// //   var state = res.state; // passed to getWithRedirect(), can be any string
// //   // manage token or tokens
// //   var tokens = res.tokens;
// }).catch(function(err) {
//   // handle OAuthError
// });
// Redirect to Okta
// oktaAuth.token.getWithRedirect({
//   responseType: 'token'
// });
// // On callback (redirectUri) page
// oktaAuth.token.parseFromUrl().then(function(res) {
//   // Save token
//   oktaAuth.tokenManager.setTokens(tokens);
//   // Read saved URL from storage
//   const url = sessionStorage.getItem('https://idashboard.intranet.local');
//   sessionStorage.removeItem('https://idashboard.intranet.local');
//   // Restore URL
//   window.location.assign(url);
// }).catch(function(err) {
//   // Handle OAuthError
// });

// var idToken = await oktaAuth.tokenManager.get('myIdToken');
// oktaAuth.signOut({
//   idToken: idToken
// });
// oktaAuth.token.getWithRedirect({
//     responseType: 'id_token'
//   });//从Okta检索ID令牌
// //解析令牌、显示来自令牌的电子邮件，然后将其添加到SDK的令牌管理器的完整代码如下所示：
// oktaAuth.token.parseFromUrl()//重定向之后，URL将包含JWT形式的ID令牌。
//   .then(idToken => {
//     console.log(`Hi ${idToken.claims.email}!`);//还可以显示已解析令牌的特定部分：
//     oktaAuth.tokenManager.add('idToken', idToken);//存储解析的令牌,一旦令牌被解析出URL，就可以使用令牌管理器
//   })



// var config = {
//     issuer: 'https://dev-894950.okta.com',
//     clientId:'0oa1gajxh09VLhqEh4x7',
//     redirectUri: 'http://localhost:3000/implicit/callback',
//     tokenManager: {
//         storage: 'sessionStorage',//您可以传递对象或字符串。如果传递对象，则应满足自定义存储提供程序的要求。传递字符串以指定内置存储类型之一：localStorage\sessionStorage\cookie（默认）\memory：简单的内存存储提供程序
//         secure: false, //如果为true，则SDK将在所有cookie上设置“安全”选项。当此选项true为时，如果应用程序源未使用HTTPS协议，则将引发异常。设置为false允许在HTTP起源上设置cookie，
//         autoRenew: false,//默认情况下，库将尝试续订过期的令牌。当库请求过期的令牌时，将执行续订请求以更新令牌。如果您希望禁用令牌的自动更新，请将autoRenew设置为false。
//         expireEarlySeconds: 120,//如果autoRenew设置为true，则使用进行访问时，令牌将在过期后的30秒内更新tokenManager.get()。您可以通过设置expireEarlySeconds选项来自定义该值。该值应足够大，以解决客户端与Okta服务器之间的网络延迟。
//       }
//   };
//   var authClient = new OktaAuth(config);
//   authClient.signIn({
//     username: 'some-username',
//     password: 'some-password'
//   })
//   .then(function(transaction) {
//     if (transaction.status === 'SUCCESS') {
//       authClient.session.setCookieAndRedirect(transaction.sessionToken); // Sets a cookie on redirect
//     } else {
//       throw 'We cannot handle the ' + transaction.status + ' status';
//     }
//   })
//   .catch(function(err) {
//     console.error(err);
//   });

const customAuthHandler = (oktaAuth) => {
     //重定向到具有CustomLoginComponent的/ login页面
    //此示例特定于React-Router
    history.push('/protected');
};
ReactDOM.render(
    <Provider {...stores}>
        <App>
            <Router history={history}>
                <Security oktaAuth={oktaAuth} onAuthRequired={customAuthHandler}>
                    {/* <Security issuer='https://amway.okta.com'
                    clientId='0oa1jxg8doe35qQEH0h8'
                    redirectUri={'http://idashboard.intranet.local/implicit/callback'}> */}
                    <Switch>
                        {/* <SecureRoute path='/loginOkta' exact component={Home} /> */}
                        <Route path='/' exact component={Home} />
                        <SecureRoute path='/modify' exact component={Modify} />
                        <Route path='/implicit/callback' component={LoginCallback} />
                        <SecureRoute path='/protected' component={Protected} />
                        <Redirect to="/" />
                    </Switch>
                </Security>
            </Router>
        </App>
    </Provider >,
    document.getElementById('root')
);

serviceWorker.unregister();