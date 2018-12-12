import { createSelector } from 'reselect'
import { apiCall } from '../../services/api'
import { fetchBasicUsers, getBasicUsers } from './replacement'

// Action Types
const SUBMIT_PREFERENCE_FORM = 'SUBMIT_PREFERENCE_FORM'
const SUBMIT_PREFERENCE_FORM_SUCCESS = 'SUBMIT_PREFERENCE_FORM_SUCCESS'
const SUBMIT_PREFERENCE_FORM_FAILURE = 'SUBMIT_PREFERENCE_FORM_FAILURE'

const GET_CURRENT_PREFERENCE_FORM = 'GET_CURRENT_PREFERENCE_FORM'
const GET_CURRENT_PREFERENCE_FORM_SUCCESS =
    'GET_CURRENT_PREFERENCE_FORM_SUCCESS'

const GET_USER_PREFERENCE_DETAIL = 'GET_USER_PREFERENCE_DETAIL'
const GET_USER_PREFERENCE_DETAIL_SUCCESS = 'GET_USER_PREFERENCE_DETAIL_SUCCESS'

const GET_ALL_PREFERENCE_FORMS = 'GET_ALL_PREFERENCE_FORMS'
const GET_ALL_PREFERENCE_FORMS_SUCCESS = 'GET_ALL_PREFERENCE_FORMS_SUCCESS'

const UPDATE_PREFERENCE_FORM_ADMIN = 'UPDATE_PREFERENCE_FORM_ADMIN'

// Selectors
const getPreferenceForms = state => state.preference.preferenceForms
// FIXME: this function has a side-effect => amti pattern, we don't determine which data we will receive first(users or forms), if forms come first, users.find... returns undefined and break the whole function
export const computedPreferenceForms = createSelector(
    getBasicUsers,
    getPreferenceForms,
    (users, forms) => {
        return forms.map(form => {
            const { full_name } =
                users.find(user => user._id === form._user) || ''
            return { ...form, full_name }
        })
    }
)

// Action Creators
export const submitPreferenceForm = preference_detail =>
    apiCall({
        type: SUBMIT_PREFERENCE_FORM,
        url: '/api/basic/preference/new',
        method: 'POST',
        data: { preference_detail },
    })

export const getCurrentPreferenceForm = () =>
    apiCall({
        type: GET_CURRENT_PREFERENCE_FORM,
        url: '/api/basic/preference',
        method: 'GET',
    })

export const getUserPreferenceDetail = () =>
    apiCall({
        type: GET_USER_PREFERENCE_DETAIL,
        url: '/api/basic/preference-detail',
        method: 'GET',
    })

export const getAllPreferenceForms = () =>
    apiCall({
        type: GET_ALL_PREFERENCE_FORMS,
        url: '/api/admin/preference/all',
        method: 'GET',
    })

export const startPreferenceListView = () => async dispatch =>
    // dispatch(getAllPreferenceForms())
    Promise.all([
        dispatch(fetchBasicUsers()),
        dispatch(getAllPreferenceForms()),
    ])
export const updatePreferenceFormAdmin = ({ form_id, ...prefObj }) =>
    apiCall({
        type: UPDATE_PREFERENCE_FORM_ADMIN,
        url: `/api/admin/preference/edit/${form_id}`,
        method: 'POST',
        data: prefObj,
    })
// Reducers
const INITIAL_STATE = {
    preferenceDetail: [],
    preferenceForms: [],
    errorMessage: '',
    isFetching: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUBMIT_PREFERENCE_FORM:
            return { ...state }
        case SUBMIT_PREFERENCE_FORM_SUCCESS:
            return { ...state }
        case SUBMIT_PREFERENCE_FORM_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage:
                    action.payload ||
                    'Something went wrong! Please try again later!',
            }
        case GET_CURRENT_PREFERENCE_FORM:
            return { ...state, isFetching: true }
        case GET_CURRENT_PREFERENCE_FORM_SUCCESS:
            return {
                ...state,
                preferenceForms: action.payload,
                isFetching: false,
            }
        case GET_USER_PREFERENCE_DETAIL:
            return { ...state, isFetching: true }
        case GET_USER_PREFERENCE_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                preferenceDetail: action.payload,
            }
        case GET_ALL_PREFERENCE_FORMS:
            return { ...state, isFetching: true }
        case GET_ALL_PREFERENCE_FORMS_SUCCESS:
            console.log('getAllPreferenceForms success')
            return {
                ...state,
                isFetching: false,
                preferenceForms: action.payload,
            }
        default:
            return state
    }
}
