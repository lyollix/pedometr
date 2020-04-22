import axios from 'axios';
import compact from 'lodash/compact';
import keys from 'lodash/keys';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import snakeCase from 'lodash/snakeCase';

// import { API_URI } from '../config';
const API_URI='http://http://188.120.243.32:3001'

function headers() {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export default class apiRequest {
    static get(path, options = null) {
        const url = isEmpty(options) ? path : [path, `${compact(keys(options).map(key => {
            const v = options[key];
            return v ? ([snakeCase(key), encodeURIComponent(isObject(v) ? JSON.stringify(v) : v)]).join('=')
                : null;
        })).join('&')}`].join('?');
        return axios.get(`${API_URI}/${url}`, headers());
    }

    static post(path, data) {
        return axios.post(`${API_URI}/${path}`, data, headers());
    }

    static put(path, data) {
        return axios.put(`${API_URI}/${path}`, data, headers());
    }

    static delete(path, id) {
        return axios.delete(`${API_URI}/${compact([path, id]).join('/')}`, headers());
    }
}
