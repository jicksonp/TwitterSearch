// @flow

'use strict';

const {
    TWEET_SEARCH_REQUEST,
    TWEET_SEARCH_SUCCESS,
    TWEET_SEARCH_FAILURE,
    NETWORK_ERROR,
    SERVER_ERROR,
} = require('../network/constants').default;

export type ApiErrorType = NETWORK_ERROR | SERVER_ERROR;
export type ApiError = { type: ApiErrorType; statusCode: number; data: any; }

export type Action = { type: TWEET_SEARCH_REQUEST }
    | { type: TWEET_SEARCH_SUCCESS }
    | { type: TWEET_SEARCH_FAILURE, error:{ code: number; } };

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
