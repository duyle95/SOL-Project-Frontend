import axios from 'axios';
import {
    SIGNIN_FAILURE,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNOUT_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    FETCH_USER,
    SIGNUP_REQUEST,
} from "./types";

const receiveSignout = () => ({
    type: SIGNOUT_SUCCESS,
    payload: {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: "",
    }
})

const requestLogin = () => ({
    type: SIGNIN_REQUEST,
    payload: {
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ""
    }
});

const receiveLogin = () => ({
    type: SIGNIN_SUCCESS,
    payload: {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ""
    }
});

const loginError = (message) => ({
    type: SIGNIN_FAILURE,
    payload: {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: message
    }
});

const requestSignup = () => ({
    type: SIGNUP_REQUEST,
    payload: {
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ""
    }
})

const signupSuccess = () => ({
    type: SIGNUP_SUCCESS,
    payload: {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ""
    }
});

const signupFailure = (message) => ({
    type: SIGNUP_FAILURE,
    payload: {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: message
    }
})

export const getCurrentUser = () => async dispatch => {
    let response;
    try {
        response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/current_user`);
        dispatch({
            type: FETCH_USER,
            payload: response.data
        })
    } catch(e) {
        console.log(e);
        // dispatch(signoutUser());
    }
}

export const signupUser = (data, redirectCallback) => async dispatch => {
    dispatch(requestSignup());
    let response;
    try {
        response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/${data.user.role}/signup`, data);

        // save jwt to localStorage
        await localStorage.setItem("token", response.data.token);
        // set 'authorization' headers for every requests from now on
        axios.defaults.headers.common['authorization'] = response.data.token;

        dispatch(signupSuccess());
        // redirect to /dashboard if success
        redirectCallback();
    } catch(e) {
        console.log(JSON.stringify(e));
        dispatch(signupFailure(e.response.data.error));
    }
}

export const signinUser = ({email, password}, redirectCallback) => async dispatch => {
    // when user hit button 'sign in', do these:
    // make a request to login
    // depends on the response we dispatch action
    dispatch(requestLogin());
    let response;
    try {
        response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/signin`, { email, password });
        // set up initial store to check if there is a jwt already in localStorage
        // HOC to only allow authenticated access

        // save jwt to localStorage
        await localStorage.setItem("token", response.data.token);
        // set 'authorization' headers for every requests from now on
        axios.defaults.headers.common['authorization'] = response.data.token;
        // NOTE: consider put { token, user_id, user_email } in the response
        
        // dispatch action to change redux state
        dispatch(receiveLogin());
        // redirect user to /dashboard
        redirectCallback();
    } catch (e) {
        if (e.response.status === 401) {
            dispatch(loginError("Wrong email or password!"));
        } else {
            dispatch(loginError("Something went wrong! Please try again later!"));
        }
    }
}

export const signoutUser = redirectCallback => async dispatch => {
    try {
        // remove jwt from local storage
        await localStorage.removeItem("token");
        // remove 'authorization' in request's header
        delete axios.defaults.headers.common["authorization"];
        // dispatch logout action and change redux state
        dispatch(receiveSignout());
        // redirect user to '/' after logging out
        redirectCallback();
    } catch (e) {
        console.log(e);
    }
}