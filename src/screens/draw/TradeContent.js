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
class Login extends Component {
  static contextTypes = {
    marketNavigation: PropTypes.object
  }

  _tradeCenter = () => {
    if (this.props.drawer._open) {
      this.props.drawer.close();
    }
    const { marketNavigation } = this.context;
    marketNavigation.navigate('TradeCenter');
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ItemBtn icon='user' title='交易中心' onPress={this._tradeCenter} />
      </View>
    );
  }
}
class TradeContent extends Component {
  render() {
    return (
      this.props.isTradeAccountLogin ? <Login drawer={this.props.drawer} /> : <Unlogin />
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