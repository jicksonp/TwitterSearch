/**
 * Created by Human on 02/10/16.
 * @flowtype
 */

import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions
} from 'react-native';

import * as GLOBAL from '../utils/Globals';
import NetworkErrorComponent from './NetworkErrorComponent';

var {height, width} = Dimensions.get('window');

const {
    NETWORK_ERROR,
    SERVER_ERROR,
} = require('../network/constants').default

var styles = StyleSheet.create({
    progressbar: {
        position: 'absolute',
        width: width,
        height: height,
        top: 0,
        left: 0,
    },
    parent: {
        flex: 1,
        backgroundColor: GLOBAL.COLOR.WHITE,
    }
});


class ShowProgressAndNetworkErrorComponent extends Component {

    static get defaultProps() {
        return {
            showError: {
                handleErrorView: false,
            },
            showContentWhileLoading: false,
        };
    }

    render() {
        let content = this.props.children;
        let loader = (
            <ActivityIndicator
                style={[styles.progressbar,
                    this.props.showContentWhileLoading && {
                        backgroundColor: GLOBAL.COLOR.LOADER_TRANSPARENT_BACKGROUND,
                    }
                ]}
                size="large"
            />
        );

        if (this.props.showError && !this.props.showError.handleErrorView) {
            if (this.props.showError.type === NETWORK_ERROR) {
                content = (
                    <NetworkErrorComponent
                        onPress={this.props.onRetry}
                    />
                );
            } else {
                content = (
                    <NetworkErrorComponent
                        onPress={this.props.onRetry}
                        networkErrorTitle={this.props.showError.message}
                    />
                );
            }
        }

        let showContentWhileLoading;
        if (this.props.showContentWhileLoading) {
            showContentWhileLoading = (
                <View style={styles.parent}>
                    {content}
                    {loader}
                </View>
            );
        } else {
            showContentWhileLoading = (
                <View style={styles.parent}>
                    {loader}
                </View>
            );
        }

        let mainContent;
        if (this.props.showLoading) {
            mainContent = showContentWhileLoading;
        } else {
            mainContent = (
                <View style={styles.parent}>
                    {content}
                </View>
            );
        }

        return (
            <View style={styles.parent}>
                {mainContent}
            </View>
        );
    }
}

export default ShowProgressAndNetworkErrorComponent;
