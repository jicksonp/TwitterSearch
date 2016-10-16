// @flow
'use strict';

import React, {
    Component,
} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import AppNavigator from './AppNavigator';
import * as GLOBAL from './utils/Globals';

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class Application extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    barStyle="light-content"
                    backgroundColor={GLOBAL.COLOR.DARK_PRIMARY}
                />
                <AppNavigator/>
            </View>
        );
    }
}