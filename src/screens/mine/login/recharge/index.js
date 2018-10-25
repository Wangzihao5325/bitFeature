import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import store from '../../../../store/index';
import { action_custom_service_model_show } from '../../../../store/actions/customServiceAction';
import VectorIconBtn from '../../../../components/IconBtn';
import NormalBtn from '../../../../components/NormalBtn';
import MaterialInput from '../../../../components/MaterialInput';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, SCREEN_BGCOLOR, DEVICE_WIDTH, BTN_BGCOLOR_RED, BRIGHT_BLUE } from '../../../../global/config';
import { I_WILL_RECHARGE, RECHARGE_NUM, RECHARGE_RIGHT_NOW, AFTER_RECHARGE_NUM, YEN } from '../../../../global/I18n';
import CommonStyles from '../../../../global/common_styles';

const NORMAL_TEXTCOLOR = '#7E829B';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const DARK_BGCOLOR = '#17191E';
let reg = { money: 0 };
class RechargeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: I_WILL_RECHARGE,  //header标题
      headerRight: (<VectorIconBtn name='headphones' onPress={navigation.getParam('customService')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
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
    addedBalance: this.props.balance
  }
  componentDidMount() {
    this.props.navigation.setParams({ customService: this._customService });
  }
  _customService = () => {
    store.dispatch(action_custom_service_model_show());
  }
  _onChangeText = (text) => {
    let num = (text == '') ? 0 : parseFloat(text);//to do ... 优化
    reg.money = num;
    this.setState((prevState, props) => {
      return ({
        addedBalance: props.balance + num
      });
    });
  }
  _recharge = () => {
    this.props.navigation.navigate('AccountDepositWebView', { money: `${reg.money}` })
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: DARK_BGCOLOR }}>
        {/*余额显示*/}
        <View style={{ height: 60, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', justifyContent: 'center', borderBottomColor: DARK_BGCOLOR, borderBottomWidth: StyleSheet.hairlineWidth }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginVertical: 4 }}>
            <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>账户余额</Text>
            <Text style={{ color: HIGHLIGHT_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>{this.props.balance + ' 元'}</Text>
          </View>
        </View>
        {/*金额输入*/}
        <MaterialInput title='充值金额' onChangeText={this._onChangeText} footerStr='元' />
        {/*充值后余额*/}
        <View style={{ height: 60, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginVertical: 4 }}>
            <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>充值后余额</Text>
            <Text style={{ color: 'white', marginLeft: 10, fontSize: 20 }}>{this.state.addedBalance + ' 元'}</Text>
          </View>
        </View>
        {/*立即充值按钮*/}
        <NormalBtn title={RECHARGE_RIGHT_NOW} style={{ backgroundColor: HIGHLIGHT_TEXTCOLOR, height: 45, width: DEVICE_WIDTH - 20, alignSelf: 'center', marginTop: 30 }} titleStyle={{ color: 'black' }} onPress={this._recharge} />
      </View>
    );
  }
}
{/* <View style={{ height: 60, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
  <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>充值金额</Text>
</View>
<View style={{ flex: 1, height: 40, marginLeft: 10, marginRight: 15, backgroundColor: DARK_BGCOLOR, flexDirection: 'row', borderRadius: 5, alignItems: 'center' }}><TextInput style={{ flex: 1, color: 'white' }} onChangeText={this._onChangeText} /><Text style={{ color: NORMAL_TEXTCOLOR, fontSize: 20, marginRight: 5 }}>元</Text></View>
</View> */}
function mapState2Props(store) {
  return {
    balance: store.account.balance
  }
}

export default connect(mapState2Props)(RechargeScreen);