//@flow
'use strict';

import type {Action, ApiErrorType} from '../actions/types';
import * as GLOBAL from '../utils/Globals';

const {
    TWEET_SEARCH_REQUEST,
    TWEET_SEARCH_SUCCESS,
    TWEET_SEARCH_FAILURE,
    SERVER_ERROR,
} = require('../network/constants').default;


export type Error = {
    message: ?string;
    type: ?ApiErrorType;
    handleErrorView:boolean,
}

export type State = {
    isFetching: boolean;
    isSuccess:boolean;
    tweets: Array<Object>;
    showError: ?Error;
};

const initialState = {
    isFetching: false,
    isSuccess: false,
    tweets: null,
    showError: null,
};

function search(state: State = initialState, action: Action): State {
    console.log('search reducer ' + JSON.stringify(action));

    switch (action.type) {

        case TWEET_SEARCH_REQUEST:
            return {
                ...state,
                isFetching: true,
                isSuccess: false,
                showError: null,
            };

        case TWEET_SEARCH_SUCCESS:
            console.log('TWEET_SEARCH_SUCCESS action.data is ' + JSON.stringify(action.data));
            let {tweets} = action.data;
            let output = {
                ...state,
                tweets,
                isSuccess: true,
                isFetching: false,
                showError: null,
            };
            console.log('TWEET_SEARCH_SUCCESS output is ' + JSON.stringify(output));
            return output;

        case TWEET_SEARCH_FAILURE:
            let type = action.data.type;
            let message;
            if (type === SERVER_ERROR) {
                message = GLOBAL.STRINGS.SEARCH_ERROR;
            }
            return {
                ...state,
                isFetching: false,
                isSuccess: false,
                showError: {
                    message,
                    type,
                    handleErrorView: false,
                }
            };
    }
    return state;
}

module.exports = search;
