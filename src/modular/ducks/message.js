// Action Types
const SET_MESSAGE_OBJECT = 'SET_MESSAGE_OBJECT';
const RESET_MESSAGE_OBJECT = 'RESET_MESSAGE_OBJECT';

// Selectors

// Action Creators
export const setMessage = (type, detail, ...props) => dispatch => {
    dispatch({
        type: SET_MESSAGE_OBJECT,
        payload: {
            type,
            detail
        }
    })
} 

export const resetMessage = () => async dispatch => {
    return dispatch({ type: RESET_MESSAGE_OBJECT })
}

// Reducers
const initialState = {
    hasMessage: false,
    messageDetail: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_MESSAGE_OBJECT:
            return { ...state, hasMessage: true, messageDetail: action.payload }
        case RESET_MESSAGE_OBJECT:
            return { ...state, hasMessage: false, messageDetail: null };
        default:
            return state;
    }
}