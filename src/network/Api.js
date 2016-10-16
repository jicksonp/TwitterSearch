// @flow
'use strict'

const {
    NETWORK_ERROR,
    SERVER_ERROR,
} = require('./constants').default;

import type {ApiError, ApiErrorType} from '../actions/types';
import _ from 'underscore';
import * as Urls from './Urls';



function apiError(type: ApiErrorType, statusCode: number, data: any): ApiError {
    return {
        type: type,
        statusCode: statusCode,
        data: data,
    };
}

export default class Api {

    accessToken: String;

    constructor() {
        this.accessToken = 'AAAAAAAAAAAAAAAAAAAAAC3hxQAAAAAAnvCJLe07g7TSMz6IvyFvOwo6AYE%3DER8Ee9PvQGEfcvvH7pDxO19tb01cPal8M01DUTLGBAcgshUKKY';
    }

    async search(hashtag) {
        let url = Urls.SEARCH_HASH_TAG + hashtag;
        return await this._fetch({
            method: 'GET',
            url,
        }).then((res) => {
            console.log('Response status inside ' + res.status);
            if (res.status === 200) {
                return res.json
            } else {
                throw (apiError(SERVER_ERROR, res.status, res.json))
            }
        }).catch((error) => {
            console.log('Catch Response  ' + JSON.stringify(error));
            if (error.type) {
                throw (error);
            } else {
                throw (apiError(NETWORK_ERROR, 0, error))
            }
        })
    }

    /**
     * ### _fetch
     * A generic function that prepares the request
     *
     * @returns object:
     *  {
     *      code: response.code,
     *      status: response.status,
     *      json: response.json()
     *  }
     */
    async _fetch(options) {
        options = _.extend({
            method: 'GET',
            url: null,
            body: null,
            callback: null
        }, options)

        var requestOptions = {
            method: options.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        if (this.accessToken) {
            console.log("Api accessToken " + this.accessToken)
            requestOptions.headers['Authorization'] = 'Bearer ' + this.accessToken
        }

        if (options.body) {
            requestOptions.body = JSON.stringify(options.body)
        }

        let url = Urls.BASE_URL + options.url
        console.log('Url is ' + url);
        console.log('reqOpts' + JSON.stringify(requestOptions));

        let res = {}

        let response = await fetch(url, requestOptions)
        res.status = response.status
        res.code = response.code

        console.log('Response status' + res.status);
        //console.log('Response ' + JSON.stringify(response));

        return response.json()
            .then((json) => {
                res.json = json
                return res
            });
    }
};
