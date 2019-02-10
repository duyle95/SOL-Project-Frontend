import { get } from 'lodash'
// import history from './history'
import { signoutUser } from '../modular/ducks/auth'
import { setMessage } from '../modular/ducks/message'
import { getErrorActionType, getSuccessActionType } from './axios'

const getToken = () => localStorage.getItem('token')

const makeAuthHeaders = token => {
    if (token) {
        return { authorization: token }
    }

    return {}
}

const isUnauthorized = status => status === 401

const handleApiSuccess = response => {
    const message = get(response, 'response.data.message')
    const method = get(response, 'response.config.method')

    const { action, dispatch, next } = response

    const nextAction = {
        type: getSuccessActionType(action),
        payload: response.response.data,
        meta: {
            previousAction: action,
        },
    }

    next(nextAction)
    if (method === 'post') {
        dispatch(setMessage('success', message))
    }
}

const handleApiError = response => {
    // if the server is down, the code below won't work -> response.error.response is undefined
    const status = get(response, 'error.response.status')
    const message =
        get(response, 'error.response.data.message') ||
        'Something went wrong with the server! Please try again later!'
    // action is the starting action that being called
    const { error, action, next, options, dispatch } = response

    if (isUnauthorized(status)) {
        dispatch(setMessage('error', 'You are not logged in!'))
        return dispatch(signoutUser())
    } else {
        dispatch(setMessage('error', message))
    }

    // declare the error object and pass it as property to the '_FAIL' action
    const errorObject = {
        message: error.message,
        code: error.response.status || null,
        config: error.config,
        response: error.response,
    }

    // declare the action object with type_FAIL; and error, payload object taken from response.action
    const nextAction = {
        type: getErrorActionType(action, options),
        error: errorObject,
        payload: action.payload,
    }

    // dispatch the action with FAIL suffix
    next(nextAction)
}

export const apiCall = ({
    endpoint,
    type,
    types,
    payload,
    method = 'GET',
    ...opts
}) => dispatch => {
    const token = getToken()
    const authHeaders = makeAuthHeaders(token)

    return dispatch({
        type,
        types,
        payload: {
            request: {
                url: endpoint,
                method,
                headers: {
                    ...authHeaders,
                },
                ...opts,
            },
            options: {
                onError: handleApiError,
                onSuccess: handleApiSuccess,
            },
        },
    })
}
