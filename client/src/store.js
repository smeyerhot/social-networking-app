import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import setupSocket from './sockets'
const sagaMiddleware = createSagaMiddleware()
const middleWares = [sagaMiddleware, thunk]

export default () =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));

sagaMiddleware.run(handleNewMessage, {socket, username})