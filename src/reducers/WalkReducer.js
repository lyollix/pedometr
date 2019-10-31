import { LOCATION_CHANGE } from 'react-router-redux';

import {
    FETCH_WALKS_START,
    FETCH_WALKS_SUCCESS,
    FETCH_WALKS_ERROR,
    SHOW_WALK_START,
    SHOW_WALK_SUCCESS,
    SHOW_WALK_ERROR,
    CREATE_WALK_START,
    CREATE_WALK_SUCCESS,
    CREATE_WALK_ERROR
} from '../constants/Walk';

const defaultState = {
    path: null,

    item: {},
    itemLoading: false,
    itemFetched: false,
    itemErrorMessage: null,

    items: [],
    itemsFetched: false,
    itemsLoading: false,
    itemsErrorMessage: null,
    itemsMeta: { page: 1, pageSize: 10 }
};

export default function WalkReducer(state = defaultState, {
    type, payload, items, meta, errorMessage, item
}) {
    switch (type) {
        case LOCATION_CHANGE:
            return state.path === payload.pathname ? { ...state } : { ...defaultState, path: payload.pathname };

        case FETCH_WALKS_START:
            return {
                ...state,
                itemsLoading: true,
                itemsFetched: false
            };

        case FETCH_WALKS_SUCCESS:
            return {
                ...state,
                itemsLoading: false,
                itemsErrorMessage: null,
                itemsFetched: true,
                items,
                itemsMeta: meta
            };

        case FETCH_WALKS_ERROR:
            return {
                ...state,
                itemsLoading: false,
                itemsFetched: false,
                itemsErrorMessage: errorMessage
            };

        case SHOW_WALK_START:
            return {
                ...state,
                itemLoading: true,
                itemFetched: false
            };

        case SHOW_WALK_SUCCESS:
            return {
                ...state,
                itemLoading: false,
                itemFetched: true,
                itemErrorMessage: null,
                item
            };

        case SHOW_WALK_ERROR:
            return {
                ...state,
                itemLoading: false,
                itemFetched: false,
                itemErrorMessage: errorMessage
            };

        case CREATE_WALK_START:
            return {
                ...state,
                itemLoading: true
            };

        case CREATE_WALK_SUCCESS:
            return {
                ...state,
                itemLoading: false,
                itemErrorMessage: null,
                item
            };

        case CREATE_WALK_ERROR:
            return {
                ...state,
                itemLoading: false,
                itemErrorMessage: errorMessage
            };

        default:
            return state;
    }
}
