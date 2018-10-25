import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import ItemBtn from './component/ItemBtn';
import NormalBtn from '../../components/NormalBtn';
import { TAB_NAVI_HEADER_BGCOLOR, DEVICE_WIDTH } from '../../global/config';
const WIDTH = DEVICE_WIDTH * 0.6;
const COM_BTN_HEIGHT = 35;
const COM_BTN_WIDTH = WIDTH - 40;
const HIGHLIGHT_TEXTCOLOR = '#FED330';
class Unlogin extends Component {
  _login_trade = () => {
    console.log('login trade');
  }
  render() {
    return (
      <View style={{ height: 55, width: WIDTH, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: TAB_NAVI_HEADER_BGCOLOR }}>
        <NormalBtn
          title={'立即交易'}
          onPress={this._login_trade}
          titleStyle={{ color: 'black' }}
          style={{ height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: HIGHLIGHT_TEXTCOLOR }}
        />
      </View>
    );
  }
}
class TradeContent extends Component {
  render() {
    return (
      this.props.isTradeAccountLogin ? <View /> : <Unlogin />
    );
  }
}

function mapState2Props(store) {
  return {
    isTradeAccountLogin: store.tradeAccount.isTradeAccountLogin,
    loginAccountNum: store.tradeAccount.loginAccountNum
  }
}

export default connect(mapState2Props)(TradeContent);