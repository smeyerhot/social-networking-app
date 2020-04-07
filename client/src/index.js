import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import createStore from './store';
import setAuthToken from './setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';
import './index.css';

import { addUser } from './actions/chatActions'

const store = createStore()
// import { createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'redux-saga'
store.dispatch(addUser('Me'))

// import setupSocket from './sockets'
// import reducers from './reducers'
// import handleNewMessage from './sagas'
// import username from './utils/name'

// const sagaMiddleware = createSagaMiddleware()

// const store = createStore(
// 	reducers,
// 	applyMiddleware(sagaMiddleware)
// )

// const socket = setupSocket(store.dispatch, username)

// sagaMiddleware.run(handleNewMessage, {socket, username})



// Code snippet from Krunal
// https://appdividend.com/2018/07/18/react-redux-node-mongodb-jwt-authentication/#React_Redux_Node_MongoDB_JWT_Authentication
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
// string = "yo whats good bro this is a nice fucking string"