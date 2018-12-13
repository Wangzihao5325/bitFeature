import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import ItemBtn from './component/ItemBtn';
import ToastRoot from '../../components/ToastRoot';
import { TAB_NAVI_HEADER_BGCOLOR, DEVICE_WIDTH } from '../../global/config';
const WIDTH = DEVICE_WIDTH * 0.6;
class Header extends Component {
  _search = () => {
    ToastRoot.show('研发中,敬请期待...');
  }
  _collection_list = () => {//前往自选
    ToastRoot.show('研发中,敬请期待...');
  }
  render() {
    const headerTitle = this.props.isTradeAccountLogin ? '交易账号: ' + this.props.loginAccountNum : '没有登录交易账号';
    return (
      <View style={{ height: 170, width: WIDTH, backgroundColor: TAB_NAVI_HEADER_BGCOLOR }}>
        <View style={{ height: 90, width: WIDTH, display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1 }}>
          <Text style={{ color: 'white', fontSize: 20 }}>{headerTitle}</Text>
        </View>
        <ItemBtn icon='search' title='搜索' onPress={this._search} />
        <ItemBtn icon='star' title='自选列表' onPress={this._collection_list} />
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    isTradeAccountLogin: store.nowTradeAccount.isTradeAccountLogin,
    loginAccountNum: store.nowTradeAccount.loginAccountNum
  }
}

export default connect(mapState2Props)(Header);