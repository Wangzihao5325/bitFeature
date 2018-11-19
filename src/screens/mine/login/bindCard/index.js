import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import Api from '../../../../socket/platform/api';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH, PLATFORM_DOMAIN } from '../../../../global/config';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
class Item extends Component {
  render() {
    let path = PLATFORM_DOMAIN + this.props.item.bankimgpath;
    return (
      <View style={{ height: 120, width: DEVICE_WIDTH - 30 }}>
        <View style={{ flex: 2, flexDirection: 'row' }}>
          <Image source={{ uri: path }} />
          <Text>{this.props.item.bankName}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{this.props.item.card}</Text>
        </View>
      </View>
    );
  }
}
export default class BindCardScreen extends Component {
  static navigationOptions = {
    title: "绑定银行卡",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };

  componentDidMount() {
    Api.getBindedBankCard(this._getBindedCardSuccess);
  }

  _getBindedCardSuccess = (e) => {
    console.log(e);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ flex: 1 }} >

        </View>
        <TouchableHighlight style={{ height: 50, width: DEVICE_WIDTH, backgroundColor: HIGHLIGHT_BGCOLOR, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
          <Text>绑定银行卡</Text>
        </TouchableHighlight>
      </View>
    );
  }
}