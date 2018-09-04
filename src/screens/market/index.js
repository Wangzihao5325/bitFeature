import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import CommonStyle from '../../global/common_styles';
export default class MarketScreen extends Component {
  state = {
    text: 'market',
    reg: 0,
  };
  componentDidMount() {
    this.props.navigation.setParams({ search: this._searchBarShow });
  }
  _searchBarShow = () => {
    this.setState({ reg: this.state.reg + 1 });
  }
  render() {
    return (
      <View style={CommonStyle.absoluateCenterStyle}>
        <Text>{this.state.text + ' click : ' + this.state.reg}</Text>
        <Button title='navigator' onPress={() => this.props.navigation.navigate('MarketDetailScreen')} />
      </View>
    );
  }
}