import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import CardBalance from '../../../../components/CardHeader/CardBalance';
import UnderlineInput from '../../../../components/UnderlineInput';
import NormalBtn from '../../../../components/NormalBtn';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, SCREEN_BGCOLOR, DEVICE_WIDTH, BTN_BGCOLOR_RED, BRIGHT_BLUE } from '../../../../global/config';
import { I_WILL_RECHARGE } from '../../../../global/I18n';
import CommonStyles from '../../../../global/common_styles';

class RechargeScreen extends Component {
  static navigationOptions = {
    title: I_WILL_RECHARGE,
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR
    },
    headerTintColor: HEADER_TINT_COLOR
  }
  constructor(props) {
    super(props);
    this._onChangeText = this._onChangeText.bind(this);
  }
  state = {
    addedBalance: this.props.balance
  }
  _onChangeText = (text) => {
    let num = parseFloat(text);
    this.setState((prevState, props) => {
      return ({
        addedBalance: props.balance + num
      });
    });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: SCREEN_BGCOLOR }}>
        <View style={[{ height: 120, width: DEVICE_WIDTH }, CommonStyles.innerAbsCenterStyle]}>
          <CardBalance />
        </View>
        <View style={{ flex: 1, borderTopColor: '#000000', borderTopWidth: 1 }}>
          <UnderlineInput fitMode={true} title='充值金额' onChangeText={this._onChangeText} />
          <NormalBtn title='立即充值' style={{ backgroundColor: BTN_BGCOLOR_RED, height: 45, width: DEVICE_WIDTH - 20, alignSelf: 'center', borderRadius: 5 }} titleStyle={{ color: 'white' }} />
          <View style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, paddingRight: 10, flexDirection: 'row' }}>
            <Text style={{ color: '#909090' }}>充值后余额</Text>
            <Text style={{ color: BRIGHT_BLUE }}>{this.state.addedBalance}</Text>
            <Text style={{ color: '#909090' }}>元</Text>
          </View>
        </View>
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    balance: store.account.balance
  }
}

export default connect(mapState2Props)(RechargeScreen);