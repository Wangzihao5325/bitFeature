import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Api from '../../../socket/platform/api';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../global/config';
import { connect } from 'react-redux';
import store from '../../../store/index';
import { action_getbalancerate } from '../../../store/actions/accountAction';
import NormalBtn from '../../../components/NormalBtn';
import ToastRoot from '../../../components/ToastRoot';
const COM_BTN_HEIGHT = 35;
const COM_BTN_WIDTH = DEVICE_WIDTH - 40;
const LIGHT_BGCOLOR = '#17191E';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const RED = '#FC3759';
class Items extends Component {
  render() {
    let choose = this.props.choose;
    let itemData = this.props.item;
    let key = choose + 'initialAmount';
    let fullName = itemData.fullName;
    let showInit = itemData[key];
    let index = itemData.index;
    let bgColor = (index % 4 === 0 || index % 4 === 1) ? '#323442' : NORMAL_BACKGROUNDCOLOR;
    let borderColor = index % 2 === 0 ? { borderRightColor: LIGHT_BGCOLOR, borderRightWidth: 1 } : null;
    return (
      <View style={[{ height: 30, width: DEVICE_WIDTH / 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, backgroundColor: bgColor }, borderColor]}>
        <Text style={{ color: NORMAL_TEXTCOLOR }}>{fullName}</Text><Text style={{ color: 'white' }}>{showInit + '手'}</Text>
      </View>
    );
  }
}
class OpenTradeAccountScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '确认开户',  //header标题
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  _openSuccess = (e) => {
    let tranAccount = e.tranAccount;
    let tranPassword = e.tranPassword;
    Api.getbalancerate(4, null, this._getbalancerateSuccess);
    ToastRoot.show(`开户成功`);
    this.props.navigation.replace('ApplyTradeAccountSuccessScreen', { tranAccount: tranAccount, tranPassword: tranPassword });
  }
  _getbalancerateSuccess = (result) => {
    store.dispatch(action_getbalancerate(result));
  }
  _openTradeAccount = () => {
    let chooseNum = parseInt(this.props.choose);
    if (chooseNum <= this.props.accountMoney) {
      Api.payApplyTrade(chooseNum, this._openSuccess);
    } else {
      this.props.navigation.popToTop();
      this.props.navigation.navigate('RechargeScreen');
    }
  }
  _seeProtocol = () => {
    //查看操盘合作协议
    this.props.navigation.navigate('TradeProtocol');
  }
  render() {
    let text = '账户余额充足'
    let btnText = '确认支付';
    let btnColor = HIGHLIGHT_TEXTCOLOR;
    if (parseInt(this.props.choose) > this.props.accountMoney) {
      btnText = '余额不足,立即充值';
      btnColor = RED;
      text = '余额不足，请充值'
    }
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT_BGCOLOR }}>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>-可交易品种-</Text>
        </View>
        <View style={{ height: 180, width: DEVICE_WIDTH }}>
          <FlatList
            horizontal={false}
            numColumns={2}
            data={this.props.contract}
            renderItem={({ item }) => <Items item={item} choose={this.props.choose} />}
          />
        </View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT_BGCOLOR }}>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>交易时间：09:00-23:55，不同期货不同交易时间段</Text>
        </View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>账户管理费</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>免费</Text></View></View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>交易保证金</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.choose + ' 元'}</Text></View></View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>操盘总资金</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.scheme[this.props.choose]['traderTotal'] + ' 元'}</Text></View></View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>亏损平仓线</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.scheme[this.props.choose]['lineLoss'] + ' 元'}</Text></View></View>
        <View style={{ height: 10, width: DEVICE_WIDTH, backgroundColor: LIGHT_BGCOLOR }} />
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>账户余额:</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: HIGHLIGHT_TEXTCOLOR }}>{this.props.accountMoney + ' 元'}</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 5 }}><Text style={{ color: NORMAL_TEXTCOLOR }}>{text}</Text></View></View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>支付金额:</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: HIGHLIGHT_TEXTCOLOR }}>{this.props.choose + ' 元'}</Text></View ><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 5 }}><Text style={{ color: NORMAL_TEXTCOLOR }}>交易保证金</Text></View></View>
        <View style={{ flex: 1, backgroundColor: LIGHT_BGCOLOR, justifyContent: 'center', alignItems: 'center' }}>
          <NormalBtn
            title={btnText}
            onPress={this._openTradeAccount}
            titleStyle={{ color: 'black' }}
            style={{ height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: btnColor }}
          />
          <Text style={{ color: NORMAL_TEXTCOLOR, marginTop: 10 }}>提交申请表表示阅读并同意</Text>
          <Text style={{ color: HIGHLIGHT_TEXTCOLOR, marginTop: 5 }} onPress={this._seeProtocol}>《期货操盘合作协议》</Text>
          <Text style={{ color: NORMAL_TEXTCOLOR, marginTop: 5 }}>客服热线：400-852-8008</Text>
        </View>
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    contract: store.depositStore.contract,
    choose: store.depositStore.choose,
    scheme: store.depositStore.scheme,
    accountMoney: store.account.balance
  }
}

export default connect(mapState2Props)(OpenTradeAccountScreen);