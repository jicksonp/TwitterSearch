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
        console.log('Search Tweets using tag ' + this.state.searchText);
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