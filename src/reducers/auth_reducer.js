import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,
    SIGNOUT_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS,
    SIGNUP_REQUEST,
    FETCH_USER
} from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    isAuthenticated: false,
    errorMessage: "",
    user: {},
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_USER:
            return { ...state, ...{ user: action.payload } };
        case SIGNIN_REQUEST:
            return { ...state, ...action.payload };
        case SIGNIN_SUCCESS:
            return { ...state, ...action.payload };
        case SIGNIN_FAILURE:
            return { ...state, ...action.payload };
        case SIGNOUT_SUCCESS:
            return { ...state, ...action.payload };
        case SIGNUP_FAILURE:
            return { ...state, ...action.payload };
        case SIGNUP_SUCCESS:
            return { ...state, ...action.payload };
        case SIGNUP_REQUEST:
            return { ...state, ...action.payload };
        default: 
            return state;
    }
}