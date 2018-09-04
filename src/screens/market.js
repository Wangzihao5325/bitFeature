import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CommonStyle from '../global/common_styles';

export default class MarketScreen extends Component {
  state = {
    text: 'market'
  };
  componentDidMount() {
    this.props.navigation.setParams({search:this._searchBarShow});
  }
  _searchBarShow=()=>{
    this.setState({
      text:'navigation testing!'
    });
  }
  render() {
    return (
      <View style={CommonStyle.absoluateCenterStyle}>
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}