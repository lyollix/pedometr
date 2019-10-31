import Promise from 'bluebird';
import get from 'lodash/get';

import { apiRequest } from '@/utils';

import {
    DELETE_WALK_START,
    DELETE_WALK_SUCCESS,
    DELETE_WALK_ERROR
} from '@/constants/Walk';

export function deleteWalkStart() {
    return {
        type: DELETE_WALK_START
    };
}

export function deleteWalkSuccess(item = {}) {
    return {
        type: DELETE_WALK_SUCCESS,
        item
    };
}

export function deleteWalkError(error) {
    return {
        type: DELETE_WALK_ERROR,
        errorMessage: get(error, 'response.data.errors', ['Server error']).join(', ')
    };
}

export default function deleteWalk(walkId) {
    return dispatch => {
        dispatch(deleteWalkStart());

        return apiRequest.delete(`walking/${walkId}`)
            .then(() => Promise.resolve(dispatch(deleteWalkSuccess())))
            .catch(error => Promise.reject(dispatch(deleteWalkError(error))));
    };
}
