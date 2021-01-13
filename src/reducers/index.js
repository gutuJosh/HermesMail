import { combineReducers } from 'redux';
import basketReducer from './basketReducer.js';
import languageReducer from './languageReducer.js';
import userReducer from './userReducer.js';
import layoutReducer from './layoutReducer.js';

export default combineReducers({
       basketState: basketReducer,
       languageState: languageReducer,
       userState: userReducer,
       layoutState: layoutReducer
});