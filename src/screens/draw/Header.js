import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import ItemBtn from './component/ItemBtn';
import { TAB_NAVI_HEADER_BGCOLOR, DEVICE_WIDTH } from '../../global/config';
const WIDTH = DEVICE_WIDTH * 0.6;
class Header extends Component {
  _search = () => {
    console.log('go to search');
  }
  _collection_list = () => {//前往自选
    console.log('go to collection list');
  }
  render() {
    const headerTitle = this.props.isTradeAccountLogin ? '交易账号: ' + this.props.loginAccountNum : '没有登陆交易账号';
    return (
      <View style={{ height: 170, width: WIDTH, backgroundColor: TAB_NAVI_HEADER_BGCOLOR }}>
        <View style={{ height: 90, width: WIDTH, display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1 }}>
          <Text style={{ color: 'white', fontSize: 20 }}>{headerTitle}</Text>
        </View>
        <ItemBtn icon='user' title='搜索' onPress={this._search} />
        <ItemBtn icon='user' title='自选列表' onPress={this._condition_order} />
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    isTradeAccountLogin: store.tradeAccount.isTradeAccountLogin,
    loginAccountNum: store.tradeAccount.loginAccountNum
  }
}

export default connect(mapState2Props)(Header);