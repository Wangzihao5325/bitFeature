import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store/index';
import TradeSocket from '../../socket/tradeSocket/index';
import ItemBtn from './component/ItemBtn';
import NormalBtn from '../../components/NormalBtn';
import ToastRoot from '../../components/ToastRoot';
import Api from '../../socket/platform/api';
import Dialog from '../../components/ImageVerification/Dialog';
import { action_trade_flash_login_show } from '../../store/actions/customServiceAction';
import { update_trade_account_list } from '../../store/actions/tradeAccountAction';
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
    marketNavigation.navigate('TradeScreen');
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

  state = {
    isShow: false
  }

  _tradeCenter = () => {
    if (this.props.drawer._open) {
      this.props.drawer.close();
    }
    const { marketNavigation } = this.context;
    marketNavigation.navigate('TradeCenter');
  }
  _gotoCapitalDetailsScreen = () => {
    let state = store.getState();
    if (!state.account.isLogin) {
      ToastRoot.show('请先登录平台账户');
      return;
    }
    if (this.props.drawer._open) {
      this.props.drawer.close();
    }
    const { marketNavigation } = this.context;
    marketNavigation.navigate('CapitalDetailsScreen');
  }
  _gotoAccountInnerDetail = () => {
    let state = store.getState();
    if (!state.account.isLogin) {
      ToastRoot.show('请先登录平台账户');
      return;
    }
    Api.getTradeAccount(this._getTradeAccountSuccess, this._getTradeAccountFailed);
  }
  _getTradeAccountSuccess = (result) => {
    let tradeList = result.tradeList ? result.tradeList : [];
    store.dispatch(update_trade_account_list(tradeList));
    let state = store.getState();
    if (state.tradeAccount.onTradingAccountList.length > 0) {
      let arr = state.tradeAccount.onTradingAccountList;
      let accountId = state.nowTradeAccount.loginAccountNum;
      let reg = arr.filter(function (item) {
        return item.tranAccount = accountId;
      });
      if (reg.length > 0) {
        let data = reg[0];
        if (this.props.drawer._open) {
          this.props.drawer.close();
        }
        const { marketNavigation } = this.context;
        marketNavigation.navigate('InnerDetail', { tranAccount: JSON.stringify(data) });
      }
    }
  }
  _getTradeAccountFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  _gotoTradeAccountList = () => {
    let state = store.getState();
    if (!state.account.isLogin) {
      ToastRoot.show('请先登录平台账户');
      return;
    }
    if (this.props.drawer._open) {
      this.props.drawer.close();
    }
    const { marketNavigation } = this.context;
    marketNavigation.navigate('TradeAccountDetailScreen');
  }

  _gotoOpenNewTradeAccount = () => {
    if (this.props.drawer._open) {
      this.props.drawer.close();
    }
    const { marketNavigation } = this.context;
    marketNavigation.navigate('TradeScreen');
  }

  _changeTradeAccount = () => {
    let state = store.getState();
    if (!state.account.isLogin) {
      ToastRoot.show('请先登录平台账户');
      return;
    }
    Api.getTradeAccount(this._changeRightNow, this._getTradeAccountFailed);
  }
  _changeRightNow = (result) => {
    let tradeList = result.tradeList ? result.tradeList : [];
    store.dispatch(update_trade_account_list(tradeList));
    let state = store.getState();
    if (state.tradeAccount.onTradingAccountList.length > 1) {
      store.dispatch(action_trade_flash_login_show());
      if (this.props.drawer._open) {
        this.props.drawer.close();
      }
    } else {
      ToastRoot.show('暂无其他可交易账户');
    }
  }
  _tradeLogout = () => {
    let state = store.getState();
    let nowTradeAccount = state.nowTradeAccount.loginAccountNum;
    TradeSocket.logout(nowTradeAccount, this._logoutSuccess);
  }
  _logoutSuccess = () => {
    ToastRoot.show('交易账号登出成功');
  }
  _tradeAccountOver = () => {
    let state = store.getState();
    if (!state.account.isLogin) {
      ToastRoot.show('请先登录平台账户');
      return;
    }
    let holdPositionsArr = state.nowTradeAccount.holdPositions;
    if (holdPositionsArr.length <= 0) {
      ToastRoot.show('当前有持仓,无法终结方案!');
    } else {
      this.setState({
        isShow: true
      });
      if (this.props.drawer._open) {
        this.props.drawer.close();
      }
    }
  }
  _onConfirm = () => {
    this.setState({
      isShow: false
    });
    Api.getTradeAccount(this._overTradeAccountRightNow);
  }
  _overTradeAccountRightNow = (result) => {
    let tradeList = result.tradeList ? result.tradeList : [];
    store.dispatch(update_trade_account_list(tradeList));
    let state = store.getState();
    if (state.tradeAccount.onTradingAccountList.length > 0) {
      let arr = state.tradeAccount.onTradingAccountList;
      let accountId = state.nowTradeAccount.loginAccountNum;
      let reg = arr.filter(function (item) {
        return item.tranAccount = accountId;
      });
      if (reg.length > 0) {
        let data = reg[0];
        let id = data.id;
        Api.endTradeAccount(id, this._endSuccess, this._endFailed);
      }
    }
  }
  _endSuccess = () => {
    let state = store.getState();
    let nowTradeAccount = state.nowTradeAccount.loginAccountNum;
    TradeSocket.logout(nowTradeAccount, this._overSuccess);
  }
  _overSuccess = () => {
    ToastRoot.show('结算成功');
  }
  _endFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  _onCancel = () => {
    this.setState({
      isShow: false
    });
  }
  _addMoney = () => {
    Api.getTradeAccount(this._gotoAddMoney);
  }
  _gotoAddMoney = (result) => {
    let tradeList = result.tradeList ? result.tradeList : [];
    store.dispatch(update_trade_account_list(tradeList));
    let state = store.getState();
    if (state.tradeAccount.onTradingAccountList.length > 0) {
      let arr = state.tradeAccount.onTradingAccountList;
      let accountId = state.nowTradeAccount.loginAccountNum;
      let reg = arr.filter(function (item) {
        return item.tranAccount = accountId;
      });
      if (reg.length > 0) {
        let data = reg[0];
        let id = data.id;
        const { marketNavigation } = this.context;
        marketNavigation.navigate('TradeAccountRecharge', { id: `${id}`, isPop: 'true' });
      }
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <ItemBtn icon='dollar' title='交易中心' onPress={this._tradeCenter} />
          <ItemBtn icon='yen' title='资金明细' onPress={this._gotoCapitalDetailsScreen} />
          {/* <ItemBtn icon='pie-chart' title='历史成交' onPress={this._gotoCapitalDetailsScreen} /> */}
          <ItemBtn icon='user' title='开户详情' onPress={this._gotoAccountInnerDetail} />
          <ItemBtn icon='yen' title='追加保证金' onPress={this._addMoney} />
          <ItemBtn icon='list' title='全部开户详情' onPress={this._gotoTradeAccountList} />
          <ItemBtn icon='flash' title='快速结算' onPress={this._tradeAccountOver} />
          <ItemBtn icon='plus-square' title='新开户申请' onPress={this._gotoOpenNewTradeAccount} />
          <ItemBtn icon='exchange' title='切换账号' onPress={this._changeTradeAccount} />
          <ItemBtn icon='power-off' title='退出登录' onPress={this._tradeLogout} />
        </ScrollView>
        <Dialog
          visible={this.state.isShow}
          header={'结算确认'}
          renderContent={() => <Text>是否确认对当前交易账户进行结算？</Text>}
          onConfirm={this._onConfirm}
          onCancel={this._onCancel}
        />
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
    loginAccountNum: store.nowTradeAccount.loginAccountNum,
  }
}

export default connect(mapState2Props)(TradeContent);