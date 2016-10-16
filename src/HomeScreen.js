//@flow

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    Button,
    SearchBar,
} from 'react-native-elements';

import ShowProgressAndNetworkErrorComponent from './common/ShowProgressAndNetworkErrorComponent';
import * as GLOBAL from './utils/Globals';
var {connect} = require('react-redux');
var PureListView = require('./common/PureListView');
var {searchTweets} = require('./actions/searchAction');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    errorContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: GLOBAL.COLOR.BLACK_54,
        fontSize: 18,
        textAlign: 'center',
    },
});

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showTweets: false,
            tweets: null,
        };
    }

    onChangeText(text) {
        this.setState({
            searchText: text,
            showTweets: false,
        });
    }

    searchTweets() {
        this.setState({
            showTweets: true,
        });
        this.props.searchTweets(this.state.searchText);
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    lightTheme
                    onSubmitEditing={this.searchTweets.bind(this)}
                    onChangeText={this.onChangeText.bind(this)}
                    placeholder='Please enter hashtag to search'/>
                <ShowProgressAndNetworkErrorComponent
                    showLoading={this.props.isFetching}
                    showError={this.props.showError}
                    onRetry={this.searchTweets.bind(this)}
                    showContentWhileLoading={false}
                >
                    {this.renderTweets()}
                </ShowProgressAndNetworkErrorComponent>
            </View>
        );
    }

    renderTweets() {
        let content = null;
        if (this.props.isSuccess && this.state.showTweets) {
            if (this.props.tweets.length > 0) {
                content = (
                    <PureListView
                        style={{flex:1}}
                        data={this.props.tweets}
                        renderRow={this.renderRow}
                    />
                );
            } else {
                content = this.renderEmptyList();
            }
        }
        return content;
    }

    renderRow(tweet) {
        return (
            <View>
                <Text>tweet {tweet.text}</Text>
            </View>
        );
    }

    renderEmptyList() {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>No Tweets found with {this.state.searchText}</Text>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchTweets: (hashtag: string) => {
            dispatch(searchTweets(hashtag));
        }
    };
};

function mapStateToProps(state) {
    return {
        isFetching: state.search.isFetching,
        isSuccess: state.search.isSuccess,
        tweets: state.search.tweets,
        showError: state.search.showError
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);