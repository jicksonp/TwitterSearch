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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

export default class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        };
    }

    onChangeText(text) {
        this.setState({
            searchText: text,
        });
    }

    searchTweets() {
        let url = 'https://api.twitter.com/1.1/search/tweets.json?q=%40' + this.state.searchText;
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAC3hxQAAAAAAnvCJLe07g7TSMz6IvyFvOwo6AYE%3DER8Ee9PvQGEfcvvH7pDxO19tb01cPal8M01DUTLGBAcgshUKKY'
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('Tweets' + JSON.stringify(responseJson));
                return responseJson.statuses;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    lightTheme
                    onSubmitEditing={this.searchTweets.bind(this)}
                    onChangeText={this.onChangeText.bind(this)}
                    placeholder='Please enter hashtag to search'/>
            </View>
        );
    }
}