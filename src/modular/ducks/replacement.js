import axios from 'axios'
import { createSelector } from 'reselect'
import { apiCall } from '../../services/api'

// Action Types
const FETCH_BASIC_USERS = 'FETCH_BASIC_USERS'
const FETCH_BASIC_USERS_SUCCESS = 'FETCH_BASIC_USERS_SUCCESS'
const FETCH_BASIC_USERS_FAIL = 'FETCH_BASIC_USERS_FAIL'

const UPDATE_REPLACEMENT_FORM_ADMIN = 'UPDATE_REPLACEMENT_FORM_ADMIN'

const SUBMIT_REPLACEMENT_FORM = 'SUBMIT_REPLACEMENT_FORM'
const SUBMIT_REPLACEMENT_FORM_SUCCESS = 'SUBMIT_REPLACEMENT_FORM_SUCCESS'
const SUBMIT_REPLACEMENT_FORM_FAIL = 'SUBMIT_REPLACEMENT_FORM_FAIL'

const FETCH_REPLACEMENT_FORMS = 'FETCH_REPLACEMENT_FORMS'
const FETCH_REPLACEMENT_FORMS_SUCCESS = 'FETCH_REPLACEMENT_FORMS_SUCCESS'

const UPDATE_REPLACEMENT_FORM_BASIC = 'UPDATE_REPLACEMENT_FORM_BASIC'

// Selectors
const getBasicUsers = state => state.replacement.basicUserList
// [ { _id, full_name },...]
const getReplacementForms = state => state.replacement.replacementForms
// take the replacee_id from each forms and search it with all elements in basicUsers and return a new forms object {...form, replacee_name}
// TODO: check if reselect should be used with async data
export const computedReplacementForms = createSelector(
  getBasicUsers,
  getReplacementForms,
  (users, forms) => {
    const newForms = forms.map(form => {
      const user = users.find(user => user._id === form.replacee_id)
      return { ...form, replacee_name: user ? user.full_name : '' }
    })

    return newForms
  }
)

// Action Creators
export const fetchBasicUsers = () =>
  apiCall({
    type: FETCH_BASIC_USERS,
    url: '/api/basic/all',
  })

export const fetchReplacementForms = role =>
  apiCall({
    type: FETCH_REPLACEMENT_FORMS,
    url: `/api/${role}/replacement/all`,
  })

export const startReplacementListView = role => async dispatch => {
  return Promise.all([
    dispatch(fetchBasicUsers()),
    dispatch(fetchReplacementForms(role)),
  ])
}

export const submitReplacementForm = replObj =>
  apiCall({
    type: SUBMIT_REPLACEMENT_FORM,
    url: '/api/basic/replacement/new',
    method: 'POST',
    data: replObj,
  })

export const updateReplacementFormAdmin = ({ form_id, ...replObj }) =>
  apiCall({
    type: UPDATE_REPLACEMENT_FORM_ADMIN,
    url: `/api/admin/replacement/edit/${form_id}`,
    method: 'POST',
    data: replObj,
  })

export const updateReplacementFormBasic = ({ form_id, ...replObj }) =>
  apiCall({
    type: UPDATE_REPLACEMENT_FORM_BASIC,
    url: `/api/basic/replacement/edit/${form_id}`,
    method: 'POST',
    data: replObj,
  })

// Reducers
const INITIAL_STATE = {
  basicUserList: [],
  replacementForms: [],
  isFetching: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BASIC_USERS_SUCCESS:
      return { ...state, basicUserList: action.payload }
    case FETCH_REPLACEMENT_FORMS:
      return { ...state, isFetching: true }
    case FETCH_REPLACEMENT_FORMS_SUCCESS:
      return { ...state, replacementForms: action.payload, isFetching: false }
    default:
      return state
  }
}
