// @flow

import React, {
    Component,
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
} from 'react-native';

import {Icon} from 'react-native-material-design';
import * as GLOBAL from '../utils/Globals';

var styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: GLOBAL.COLOR.BLACK_54,
        fontSize: 18,
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
    },
    refreshContainer: {
        alignSelf: 'center',
        marginTop: 16,
        backgroundColor: GLOBAL.COLOR.ACCENT,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40 / 2,
    },
});


class NetworkErrorComponent extends Component {

    static get defaultProps() {
        return {
            networkErrorTitle: GLOBAL.STRINGS.NETWORK_ERROR_TITLE,
        };
    }

    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.networkErrorTitle}</Text>
                    <Text style={[styles.title,styles.message]}>{GLOBAL.STRINGS.NETWORK_ERROR_MESSAGE}</Text>
                    <TouchableNativeFeedback
                        onPress={this.props.onPress}>
                        <View style={styles.refreshContainer}>
                            <Icon name="refresh" color={GLOBAL.COLOR.WHITE} onPress={this.props.onPress}/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}

export default NetworkErrorComponent;

