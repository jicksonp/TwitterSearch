//@flow

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import * as GLOBAL from '../utils/Globals';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 8,
        flexDirection: 'row',
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    name: {
        color: GLOBAL.COLOR.BLACK_54,
        fontSize: 16,
        fontWeight: '500'
    },
    screenName: {
        marginLeft: 8,
        color: GLOBAL.COLOR.BLACK_54,
        fontSize: 14,
    },
    tweetText: {
        color: GLOBAL.COLOR.BLACK_54,
        fontSize: 18,
        textAlign: 'center',
    },
    tweetContent: {
        marginLeft: 8,
        flexDirection: 'column',
    }
});

class Tweet extends Component {
    render() {
        let tweet = this.props.tweet;
        return (
            <View style={styles.container}>
                <Image
                    style={styles.profile}
                    source={{uri: tweet.user.profile_image_url_https}}
                />
                <View style={styles.tweetContent}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{tweet.user.name}</Text>
                        <Text style={styles.screenName}>@{tweet.user.screen_name}</Text>
                    </View>

                </View>

            </View>
        );
    }
}

module.exports = Tweet;