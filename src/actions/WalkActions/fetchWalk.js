import Promise from 'bluebird';
import { get } from 'lodash';

import { apiRequest } from '../../utils';

import {
    SHOW_WALK_START,
    SHOW_WALK_SUCCESS,
    SHOW_WALK_ERROR
} from '../../constants/Walk';

export function showWalkStart() {
    return {
        type: SHOW_WALK_START
    };
}

export function showWalk(item = {}) {
    return {
        type: SHOW_WALK_SUCCESS,
        item
    };
}

export function showWalkError(error) {
    return {
        type: SHOW_WALK_ERROR,
        errorMessage: get(error, 'response.data.errors', ['Server error']).join(', ')
    };
}

export default function fetchWalk(walkId) {
    return dispatch => {
        dispatch(showWalkStart());

        return apiRequest.get(`walking/${walkId}`)
            .then(({ data }) => Promise.resolve((dispatch(showWalk(data)))))
            .catch(error => Promise.reject(dispatch(showWalkError(error))));
    };
}
