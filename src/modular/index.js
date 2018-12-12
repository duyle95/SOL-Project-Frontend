import { combineReducers } from 'redux'
import authReducer from './ducks/auth'
import messageReducer from './ducks/message'
import preferenceReducer from './ducks/preference'
import replacementReducer from './ducks/replacement'

export default combineReducers({
    auth: authReducer,
    replacement: replacementReducer,
    message: messageReducer,
    preference: preferenceReducer,
})
