import React, {Component} from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {CustomHeader} from '../index'

export class NotificationsScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Chat" navigation={this.props.navigation}/>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Chat Screen!</Text>
            </View>
            </SafeAreaView>
        );
    }
}
