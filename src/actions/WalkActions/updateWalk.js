import Promise from 'bluebird';
import { get } from 'lodash';

import { apiRequest } from '../../utils';

import {
    UPDATE_WALK_START,
    UPDATE_WALK_SUCCESS,
    UPDATE_WALK_ERROR
} from '../../constants/Walk';

export function updateWalkStart() {
    return {
        type: UPDATE_WALK_START
    };
}

export function updateWalkSuccess(item = {}) {
    return {
        type: UPDATE_WALK_SUCCESS,
        item
    };
}

export function updateWalkError(error) {
    return {
        type: UPDATE_WALK_ERROR,
        errorMessage: get(error, 'response.data.errors', ['Server error']).join(', ')
    };
}

export default function updateWalk(walkId, values) {
    return dispatch => {
        dispatch(updateWalkStart());

        values.distance = Number(values.distance);

        return apiRequest.put(`walking/${walkId}`, values)
            .then(({ data }) => Promise.resolve(dispatch(updateWalkSuccess(data))))
            .catch(error => Promise.reject(dispatch(updateWalkError(error))));
    };
}
