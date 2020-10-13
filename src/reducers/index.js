import { combineReducers } from 'redux';
import basketReducer from './basketReducer.js';

export default combineReducers({
       basketState : basketReducer
});