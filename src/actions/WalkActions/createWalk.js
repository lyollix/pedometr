import Promise from 'bluebird';
import { get } from 'lodash';

import { apiRequest } from '../../utils';

import {
    CREATE_WALK_START,
    CREATE_WALK_SUCCESS,
    CREATE_WALK_ERROR
} from '../../constants/Walk';

// createProduct

export function createWalkStart() {
    return {
        type: CREATE_WALK_START
    };
}

export function createWalkSuccess(item = {}) {
    return {
        type: CREATE_WALK_SUCCESS,
        item
    };
}

export function createWalkError(error) {
    return {
        type: CREATE_WALK_ERROR,
        errorMessage: get(error, 'response.data.errors', ['Server error']).join(', ')
    };
}

export default function createWalk(values) {
    return dispatch => {
        dispatch(createWalkStart());

        return apiRequest.post('walking', values)
            .then(({ data }) => Promise.resolve(dispatch(createWalkSuccess(data))))
            .catch(error => Promise.reject(dispatch(createWalkError(error))));
    };
}
