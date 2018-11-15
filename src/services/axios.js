import { last } from 'lodash';

export const getActionTypes = (
    action,
    { successSuffix = '_SUCCESS', errorSuffix = '_FAIL' } = {}
) => {
    let types;
    if (typeof action.type !== 'undefined') {
        const { type } = action;
        types = [type, `${type}${successSuffix}`, `${type}${errorSuffix}`];
    } else if (typeof action.types !== 'undefined') {
        const { types: _types } = action;
        types = _types;
    } else {
        throw new Error('Action needs to have "type" or "types" key which is not null')
    }
    return types;
}
export const getSuccessActionType = (action, options) => getActionTypes(action, options)[1];
export const getErrorActionType = (action, options) => last(getActionTypes(action, options));