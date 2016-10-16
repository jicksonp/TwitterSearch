// @flow
'use strict';

var {combineReducers} = require('redux');

module.exports = combineReducers({
    search: require('./searchReducer'),
});
