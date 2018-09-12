import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
class ItemBtn extends Component {
  render() {
    return (
      <TouchableHighlight>
        <View>

        </View>
      </TouchableHighlight>
    );
  }
}
export default class LoginSubview extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>login subView</Text>
      </View>
    );
  }
}