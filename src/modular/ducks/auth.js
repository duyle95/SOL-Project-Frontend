import axios from 'axios';
import history from '../../services/history';


// Action Types
const SIGNIN_REQUEST = 'auth/SIGNIN_REQUEST'
const SIGNIN_SUCCESS = 'auth/SIGNIN_SUCCESS'
const SIGNIN_FAILURE = 'auth/SIGNIN_FAILURE'
const SIGNOUT_SUCCESS = 'auth/SIGNOUT_SUCCESS'
const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL'

// Action Creators
const receiveSignout = () => ({
  type: SIGNOUT_SUCCESS,
  payload: {
    isFetching: false,
    isAuthenticated: false,
    errorMessage: '',
  },
})

const requestLogin = () => ({
  type: SIGNIN_REQUEST,
  payload: {
    isFetching: true,
    isAuthenticated: false,
    errorMessage: '',
  },
})

const receiveLogin = (user = {}) => ({
  type: SIGNIN_SUCCESS,
  payload: {
    isFetching: false,
    isAuthenticated: true,
    errorMessage: '',
    user,
  },
})

const loginError = message => ({
  type: SIGNIN_FAILURE,
  payload: {
    isFetching: false,
    isAuthenticated: false,
    errorMessage: message,
  },
})

const requestSignup = () => ({
  type: SIGNUP_REQUEST,
  payload: {
    isFetching: true,
    isAuthenticated: false,
    errorMessage: '',
  },
})

const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: {
    isFetching: false,
    isAuthenticated: true,
    errorMessage: '',
    user,
  },
})

const signupFailure = message => ({
  type: SIGNUP_FAILURE,
  payload: {
    isFetching: false,
    isAuthenticated: false,
    errorMessage: message,
  },
})

const getToken = () => localStorage.getItem('token')
// this don't have to be an action creator
export const toDashboard = () => async dispatch => {
  const token = getToken()
  if (token) {
    history.replace('/dashboard')
  }
}

export const authInitialize = () => async dispatch => {
  const token = getToken()
  if (token) {
    axios.defaults.headers.common['authorization'] = token
    dispatch(receiveLogin())

    dispatch(getCurrentUser())
  }
}

// export const getCurrentUser = () => apiCall({
//     type: FETCH_USER,
//     url: '/api/current_user'
// })

export const getCurrentUser = () => async dispatch => {
  console.log('fetching user info')
  let response
  try {
    response = await axios.get(
      `${process.env.REACT_APP_BACK_END_URL}/api/current_user`
    )
    dispatch({
      type: FETCH_USER,
      payload: response.data,
    })
  } catch (e) {
    // server down or user has a wrong-format JWT
    dispatch(signoutUser())
  }
}

export const signupUser = data => async dispatch => {
  dispatch(requestSignup())
  let response
  console.log(process.env);
  try {
    response = await axios.post(
      `${process.env.REACT_APP_BACK_END_URL}/api/${data.user.role}/signup`,
      data
    )

    // save jwt to localStorage
    await localStorage.setItem('token', response.data.token)
    // set 'authorization' headers for every requests from now on
    axios.defaults.headers.common['authorization'] = response.data.token

    dispatch(signupSuccess(response.data.user))
    // redirect to /dashboard if success
    history.replace('/dashboard')
  } catch (e) {
    dispatch(signupFailure(e.response.data.error))
  }
}

export const signinUser = ({ email, password }) => async dispatch => {
  // when user hit button 'sign in', do these:
  // make a request to login
  // depends on the response we dispatch action
  dispatch(requestLogin())
  let response
  try {
    response = await axios.post(
      `${process.env.REACT_APP_BACK_END_URL}/api/signin`,
      { email, password }
    )
    // set up initial store to check if there is a jwt already in localStorage
    // HOC to only allow authenticated access

    // save jwt to localStorage
    await localStorage.setItem('token', response.data.token)
    // set 'authorization' headers for every requests from now on
    axios.defaults.headers.common['authorization'] = response.data.token

    // dispatch action to change redux state
    dispatch(receiveLogin(response.data.user))
    // redirect user to /dashboard
    history.replace('/dashboard')
  } catch (e) {
    if (e.response.status === 401) {
      dispatch(loginError('Wrong email or password!'))
    } else {
      dispatch(loginError('Something went wrong! Please try again later!'))
    }
  }
}

export const signoutUser = () => async dispatch => {
  // remove jwt from local storage
  await localStorage.removeItem('token')
  // remove 'authorization' in request's header
  delete axios.defaults.headers.common['authorization']
  // dispatch logout action and change redux state
  dispatch(receiveSignout())
  // redirect user to '/' after logging out
  history.replace('/')
}

// Reducer
const INITIAL_STATE = {
  isFetching: false,
  isAuthenticated: false,
  errorMessage: '',
  user: {},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, ...{ user: action.payload } }
    case FETCH_USER_SUCCESS:
      return { ...state, ...{ user: action.payload.data } }
    case SIGNIN_REQUEST:
      return { ...state, ...action.payload }
    case SIGNIN_SUCCESS:
      return { ...state, ...action.payload }
    case SIGNIN_FAILURE:
      return { ...state, ...action.payload }
    case SIGNOUT_SUCCESS:
      return { ...state, ...action.payload, user: {} }
    case SIGNUP_FAILURE:
      return { ...state, ...action.payload }
    case SIGNUP_SUCCESS:
      return { ...state, ...action.payload }
    case SIGNUP_REQUEST:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
