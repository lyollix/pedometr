import Promise from 'bluebird';
import { get } from 'lodash';

import { apiRequest } from '../../utils';

import {
    FETCH_WALKS_START,
    FETCH_WALKS_SUCCESS,
    FETCH_WALKS_ERROR
} from '../../constants/Walk';

export function fetchWalksStart() {
    return {
        type: FETCH_WALKS_START
    };
}

export function fetchWalksSuccess(items = [], meta = {}) {
    return {
        type: FETCH_WALKS_SUCCESS,
        items,
        meta
    };
}

export function fetchWalksError(error) {
    return {
        type: FETCH_WALKS_ERROR,
        errorMessage: get(error, 'response.data.errors', ['Server error']).join(', ')
    };
}

export default function fetchWalks({ _page = 1, _limit = 2, filters = {} }) {
    return dispatch => {
        dispatch(fetchWalksStart());

        return apiRequest.get('walking', { _page, _limit, filters })
            .then(({data}) => Promise.resolve(dispatch(fetchWalksSuccess(data, {
                ...filters
            }))))
            .catch(error => Promise.reject(dispatch(fetchWalksError(error))));
    };
}
