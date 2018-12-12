import React, { Component } from 'react';
import { View, Modal, Text, TouchableHighlight, FlatList } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store/index';
import { action_trade_flash_login_unshow } from '../../store/actions/customServiceAction';
import { DEVICE_HEIGHT, DEVICE_WIDTH, TRADE_DOMAIN } from '../../global/config';
import TradeSocket from '../../socket/tradeSocket/index';
import ToastRoot from '../../components/ToastRoot';

const marginH = 50;
const marginV = 150;
const contentHeight = DEVICE_HEIGHT - 2 * marginV;
const contentWidth = DEVICE_WIDTH - 2 * marginH;
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
class Item extends Component {
  _flashLogin = () => {
    let account = this.props.data.tranAccount;
    let password = this.props.data.tranPassword;
    TradeSocket.connectSocket(TRADE_DOMAIN.url, account, password, this._login_success, this._login_failed);
  }
  _login_success = () => {
    store.dispatch(action_trade_flash_login_unshow());
    ToastRoot.show('交易账号登录成功');
    if (this.props.logSuccess) {
      this.props.logSuccess();
    }
  }
  _login_failed = () => {
    store.dispatch(action_trade_flash_login_unshow());
    ToastRoot.show('交易账号登录失败');
    if (this.props.logFailed) {
      this.props.logFailed();
    }
  }
  render() {
    return (
      <TouchableHighlight onPress={this._flashLogin}>
        <View style={{ height: 60, width: contentWidth, display: 'flex', borderBottomWidth: 1, borderBottomColor: 'black' }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white', marginLeft: 10 }}>{`交易账号${this.props.data.tranAccount}`}</Text></View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><Text style={{ color: HIGHLIGHT_TEXTCOLOR, marginLeft: 15 }}>{`$${this.props.data.traderBond}`}</Text><Text style={{ color: NORMAL_TEXTCOLOR, marginRight: 10 }}>{'>'}</Text></View>
        </View>
      </TouchableHighlight>
    );
  }
}
class TradeFlashLogin extends Component {
  _unshow = () => {
    store.dispatch(action_trade_flash_login_unshow());
  }
  render() {
    //console.log(this.props.onTradingAccountList);
    let logSuccess = this.props.logSuccess ? this.props.logSuccess : null;
    let logFailed = this.props.logFailed ? this.props.logFailed : null;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isShow}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <View style={{ display: 'flex', width: contentWidth, marginTop: marginV, marginLeft: marginH, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
            <View style={{ height: contentHeight / 8, width: contentWidth, display: 'flex', justifyContent: 'center', borderBottomColor: 'black', borderBottomWidth: 2 }}><Text style={{ color: NORMAL_TEXTCOLOR, alignSelf: 'center' }}>已有账号,可直接登录</Text></View>
            <View style={{ height: 180, width: contentWidth }}>
              {this.props.onTradingAccountList.length > 0 &&
                <FlatList
                  data={this.props.onTradingAccountList}
                  renderItem={({ item }) => <Item data={item} logSuccess={logSuccess} logFailed={logFailed} />}
                />}
            </View>
            <TouchableHighlight onPress={this._unshow} style={{ height: contentHeight / 8, width: contentWidth, display: 'flex', justifyContent: 'center', borderBottomColor: 'black', borderBottomWidth: 2 }}><Text style={{ color: NORMAL_TEXTCOLOR, alignSelf: 'center' }}>取消</Text></TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}
function mapState2Props(store) {
  return {
    isShow: store.customService.tradeFlashLoginIsshow,
    onTradingAccountList: store.tradeAccount.onTradingAccountList
  }
}

export default connect(mapState2Props)(TradeFlashLogin);