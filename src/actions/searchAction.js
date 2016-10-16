//@flow
'use strict';

import type {Action, ThunkAction, ApiError} from "./types";

const {
    TWEET_SEARCH_REQUEST,
    TWEET_SEARCH_SUCCESS,
    TWEET_SEARCH_FAILURE,
} = require('../network/constants').default;

const ApiFactory = require('../network/ApiFactory').default;

export function searchRequest() {
    return {
        type: TWEET_SEARCH_REQUEST
    }
}

export function searchSuccess(data: JSON): Action {
    return {
        type: TWEET_SEARCH_SUCCESS,
        data: {
            tweets: data.statuses,
        }
    }
}

export function searchFailure(error: ApiError): Action {
    return {
        type: TWEET_SEARCH_FAILURE,
        data: error,
    }
}

function searchTweets(hashtag): ThunkAction {
    return dispatch => {
        console.log('Inside search');
        dispatch(searchRequest());
        return ApiFactory().search(hashtag).then(function (json) {
            console.log('Success searchTweet' + JSON.stringify(json));
            dispatch(searchSuccess(json));
        }).catch((error) => {
            console.log('Failure searchTweet' + JSON.stringify(error));
            dispatch(searchFailure(error));
        });
    };
}

module.exports = {
    searchTweets,
};
