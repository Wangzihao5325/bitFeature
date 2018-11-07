import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import Api from '../../socket/platform/api';
export default class News extends Component {
  constructor(props) {
    super(props);
    Api.getBusinessNews(0, 10, function (e) { console.log(e) });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList/>
      </View>
    );
  }
}