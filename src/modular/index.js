import { combineReducers } from 'redux';
import authReducer from './ducks/auth';
import replacementReducer from './ducks/replacement';
import messageReducer from './ducks/message';

export default combineReducers({
    auth: authReducer,
    replacement: replacementReducer,
    message: messageReducer
})