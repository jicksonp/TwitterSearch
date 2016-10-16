//@flow
'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
var promise = require('./promise');
var reducers = require('../reducers');
var createLogger = require('redux-logger');

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
});

function configureStore() {
    let store = createStore(
        reducers,
        applyMiddleware(thunk, promise, logger),
    );
    if (isDebuggingInChrome) {
        window.store = store;
    }
    return store;
}

module.exports = configureStore;
