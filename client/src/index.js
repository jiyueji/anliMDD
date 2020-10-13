import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
// import { Router, Switch, Route } from 'react-router'
import { HashRouter as Router,Switch, Route } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';
// import history from './services/history'
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
import App from './App'
import Home from './containers/Home'
import Modify from './containers/Modify'
import LoginContainer from './containers/LoginContainer'
import UserListContainer from './containers/UserListContainer'
import RegisterContainer from './containers/RegisterContainer'
import routes from './routes'
import * as serviceWorker from './registerServiceWorker';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';

const history = createHashHistory() // hash模式
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

ReactDOM.render(
    <Provider {...stores}>
        {/* <App>
            <Router history={history}>
                <Switch>
                    <Route path='/modify' exact component={Modify} />
                    <Route exact path="/" component={Home} />
                    <Route path={routes.login} component={LoginContainer} />
                    <Route path={routes.sign_up} component={RegisterContainer} />
                    <Route path={routes.users} component={UserListContainer} />
                </Switch>
            </Router>
        </App> */}
        <Router history={history}>
            <Switch>
                <Route path='/modify' exact component={Modify} />
                <App>
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path={routes.login} component={LoginContainer} />
                            <Route path={routes.sign_up} component={RegisterContainer} />
                            <Route path={routes.users} component={UserListContainer} />
                        </Switch>
                    </Router>
                </App>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();





// import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import history from './services/history'
// // import { HashRouter as Router,Switch, Route } from 'react-router-dom';
// // import { createBrowserHistory, createHashHistory } from 'history';
// import Home from './containers/Home'
// import Modify from './containers/Modify'
// import Protected from './containers/Protected';
// import App from './App'
// import authStore from './stores/AuthStore'
// import userStore from './stores/UserStore'
// import searchStore from './stores/SearchStore'
// import registerStore from './stores/RegisterStore'
// import chartStore from './stores/ChartStore'
// import chartStoreAbo from './stores/ChartStoreAbo'
// import chartStoreGrowth from './stores/ChartStoreGrowth'
// import chartStoreDaily from './stores/ChartStoreDaily'
// import chartStoreSocial from './stores/ChartStoreSocial'
// import chartRemarks from './stores/chartRemarks'
// import { Provider } from 'mobx-react'
// import * as serviceWorker from './registerServiceWorker';
// import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';

// // const history = createHashHistory() // hash模式
// const stores = {
//     authStore,
//     userStore,
//     searchStore,
//     registerStore,
//     chartStore,
//     chartStoreAbo,
//     chartStoreGrowth,
//     chartStoreDaily,
//     chartStoreSocial,
//     chartRemarks
// };

// ReactDOM.render(
//     <Provider {...stores}>
//         <App>
//             <Router history={history}>
//                 <Security issuer='https://dev-894950.okta.com'
//                     clientId='0oae6e0fxQfXsVdde4x6'
//                     redirectUri={'http://localhost:3000/implicit/callback'}>
//                     <Route path='/' exact component={Home} />
//                     <Route path='/modify' exact component={Modify} />
//                     <SecureRoute path='/protected' component={Protected} />
//                     <Route path='/implicit/callback' component={LoginCallback} />
//                 </Security>
//             </Router>
//         </App>
//     </Provider>,
//     document.getElementById('root')
//   );

// serviceWorker.unregister();


