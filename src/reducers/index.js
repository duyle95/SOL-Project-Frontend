import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import replacementReducer from './replacement_reducer';

export default combineReducers({
    auth: authReducer,
    replacement: replacementReducer
})