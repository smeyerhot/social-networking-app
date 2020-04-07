import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postsReducer from './postsReducer';
import userReducer from './userReducer';

import messages from "./messages" // chat app
import users from "./users" // chat app

export default combineReducers({
  authReducer,
  errorReducer,
  postsReducer,
  userReducer,
  messages,
  users
});
