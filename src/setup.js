// @flow
'use strict';

var React = require('React');
var {Provider} = require('react-redux');
var configureStore = require('./store/configureStore');

import Application from './Application';

function setup(): ReactClass<{}> {
    console.disableYellowBox = true;
    //TODO Do all the initialization here

    class Root extends React.Component {
        state: {
            store: any;
        };

        constructor() {
            super();
            this.state = {
                store: configureStore(),
            };
        }

        render() {
            return (
                <Provider store={this.state.store}>
                    <Application/>
                </Provider>
            );
        }
    }

    return Root;
}

global.LOG = (...args) => {
    console.log('/------------------------------\\');
    console.log(...args);
    console.log('\\------------------------------/');
    return args[args.length - 1];
};

module.exports = setup;
