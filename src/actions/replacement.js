import axios from 'axios';
import {
    FETCH_BASIC_USERS,
} from './types';

export const fetchBasicUsers = () => async dispatch => {
    let response;
    try {
        response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/basic/all`);
        // let users = response.data.map(user => user.email);
        console.log(response.data);
        dispatch({
            type: FETCH_BASIC_USERS,
            payload: {
                basicUserList: response.data
            }
        })
    } catch (e) {
        console.log(e);
    }
}

export const submitReplacementForm = (replace_shifts) => async dispatch => {
    // inconsistent variable naming
    // save a new replacement form request error, which create 2 of the same form in a collection
    let response;
    try {
        response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/basic/replacement/new`, { replace_shifts });
        console.log(response.data);
    } catch(e) {
        console.log(e);
    }
}