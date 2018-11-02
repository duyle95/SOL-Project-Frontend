import { FETCH_BASIC_USERS } from '../actions/types';

const INITIAL_STATE = {
    basicUserList: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_BASIC_USERS:
            return { ...state, ...action.payload};
        default: 
            return state;
    }
}