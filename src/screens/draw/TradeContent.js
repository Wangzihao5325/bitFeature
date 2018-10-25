import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemBtn from './component/ItemBtn';
import NormalBtn from '../../components/NormalBtn';
import { TAB_NAVI_HEADER_BGCOLOR, DEVICE_WIDTH } from '../../global/config';
const WIDTH = DEVICE_WIDTH * 0.6;
const COM_BTN_HEIGHT = 35;
const COM_BTN_WIDTH = WIDTH - 40;
const HIGHLIGHT_TEXTCOLOR = '#FED330';
class Unlogin extends Component {
  static contextTypes = {
    marketNavigation: PropTypes.object
  }
  _login_trade = () => {
    const { marketNavigation } = this.context;
    marketNavigation.navigate('TradeAccountLogScreenInMarket');
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
    isTradeAccountLogin: store.nowTradeAccount.isTradeAccountLogin,
    loginAccountNum: store.nowTradeAccount.loginAccountNum
  }
}

export default connect(mapState2Props)(TradeContent);