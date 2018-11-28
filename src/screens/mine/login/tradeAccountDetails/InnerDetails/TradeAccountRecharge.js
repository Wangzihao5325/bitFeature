import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import NormalBtn from '../../../../../components/NormalBtn';
import MaterialInput from '../../../../../components/MaterialInput';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, SCREEN_BGCOLOR, DEVICE_WIDTH } from '../../../../../global/config';
import Api from '../../../../../socket/platform/api';
import ToastRoot from '../../../../../components/ToastRoot';
import store from '../../../../../store/index';
import { action_getbalancerate } from '../../../../../store/actions/accountAction';

const NORMAL_TEXTCOLOR = '#7E829B';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const DARK_BGCOLOR = '#17191E';
let reg = { money: 0, id: '' };
class TradeAccountRecharge extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '追加保证金',  //header标题
      // headerRight: (<VectorIconBtn name='headphones' onPress={navigation.getParam('customService')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  constructor(props) {
    super(props);
    this._onChangeText = this._onChangeText.bind(this);
  }
  state = {
    addedBalance: 0
  }
  componentDidMount() {
    reg.id = this.props.navigation.getParam('id', '');
  }

  _onChangeText = (text) => {
    let num = (text == '') ? 0 : parseFloat(text);//to do ... 优化
    reg.money = num;
    this.setState((prevState, props) => {
      return ({
        addedBalance: (num / 7.1).toFixed(2)
      });
    });
  }
  _goToPlatformRecharge = () => {
    this.props.navigation.popToTop();
    this.props.navigation.navigate('RechargeScreen');
  }
  _recharge = () => {
    if (reg.money < 500) {
      ToastRoot.show('追加金额最少为500元!');
    } else {
      Api.tradeAccountRecharge(reg.id, reg.money, this._rechargeSuccess);
    }
  }
  _rechargeSuccess = (data, code, message) => {
    Api.getbalancerate(4, null, this._getbalancerateSuccess);
    ToastRoot.show('追加保证金成功');
    this.props.navigation.popToTop();
  }
  _getbalancerateSuccess = (result) => {
    store.dispatch(action_getbalancerate(result));
  }
  _rechargeFailed = (data, code, message) => {
    ToastRoot.show(message);
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: DARK_BGCOLOR }}>
        {/*余额显示*/}
        <View style={{ height: 60, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomColor: DARK_BGCOLOR, borderBottomWidth: StyleSheet.hairlineWidth }}>
          <View style={{ flex: 3, flexDirection: 'row', alignItems: 'baseline', marginVertical: 4 }}>
            <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>账户余额</Text>
            <Text style={{ color: HIGHLIGHT_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>{this.props.balance + ' 元'}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'baseline', marginVertical: 4 }}>
            <Text onPress={this._goToPlatformRecharge} style={{ color: NORMAL_TEXTCOLOR, marginRight: 10, fontSize: 14 }}>去充值 ></Text>
          </View>
        </View>
        {/*金额输入*/}
        <MaterialInput title='追加金额' onChangeText={this._onChangeText} footerStr='元' />
        {/*汇率换算*/}
        <View style={{ height: 60, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginVertical: 4 }}>
            <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>换算汇率</Text>
            <Text style={{ color: 'white', marginLeft: 10, fontSize: 20 }}>7.1人民币 = 1美元</Text>
          </View>
        </View>
        {/*充值后余额*/}
        <View style={{ height: 60, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginVertical: 4 }}>
            <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>换算美元</Text>
            <Text style={{ color: 'white', marginLeft: 10, fontSize: 20 }}>{this.state.addedBalance + ' 美元'}</Text>
          </View>
        </View>
        {/*立即充值按钮*/}
        <NormalBtn title={'立即追加'} style={{ backgroundColor: HIGHLIGHT_TEXTCOLOR, height: 45, width: DEVICE_WIDTH - 20, alignSelf: 'center', marginTop: 30 }} titleStyle={{ color: 'black' }} onPress={this._recharge} />
        <Text style={{ color: NORMAL_TEXTCOLOR, marginTop: 20, alignSelf: 'center' }}>追加金额最少为500元</Text>
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    balance: store.account.balance
  }
}

export default connect(mapState2Props)(TradeAccountRecharge);