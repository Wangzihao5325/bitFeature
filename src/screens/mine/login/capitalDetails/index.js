import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Api from '../../../../socket/platform/api';
export default class CapitalDetailsScreen extends Component {
  componentDidMount() {
    Api.getCapitalDetails(function (result) { console.log(result) });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>CapitalDetails</Text>
      </View>
    );
  }
}