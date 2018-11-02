import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import axios from "axios";

import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// check if there is a 'token' in the local storage
// if yes set up 'authorization' headers for axios and initialState
const token = localStorage.getItem("token");
let initialState;
if (token) {
    axios.defaults.headers.common["authorization"] = token;
    initialState = { auth: { isFetching: false, isAuthenticated: true, errorMessage: "", user: {} }};
} else {
    delete axios.defaults.headers.common["authorization"];
    initialState = {}
}

const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
