import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './components/Main';
import User from './components/User';
import Login from './components/Login'
import reducer from './reducers';

// Render the main component into the dom
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path='user' component={User} />
      <Route path='login' component={Login} />
    </Route>
  </Router>
  </Provider>,
  document.getElementById('app'));
