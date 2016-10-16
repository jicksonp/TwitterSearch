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

var {connect} = require('react-redux');
var PureListView = require('./common/PureListView');
var {searchTweets} = require('./actions/searchAction');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            tweets: null,
        };
    }

    onChangeText(text) {
        this.setState({
            searchText: text,
        });
    }

    searchTweets() {
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
        if (this.props.isSuccess) {
            content = (
                <PureListView
                    data={this.props.tweets}
                    renderRow={this.renderRow}
                    renderEmptyList={this.renderEmptyList.bind(this)}
                />
            );
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

    renderEmptyList(): ?ReactElement {
        return (
            <View><Text>No Tweets found with {this.state.searchText}</Text></View>
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