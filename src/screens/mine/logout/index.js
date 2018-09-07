import React, { Component } from 'react';
import { View, Text } from 'react-native';
export default class LogoutSubview extends Component {
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'white'}}>logout subView</Text>
      </View>
    );
  }
}