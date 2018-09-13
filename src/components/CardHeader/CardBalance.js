import React, { Component } from 'react';
import { View, Text } from 'react-native'
import store from '../../store/index'
import { connect } from 'react-redux'
import CommonStyle from '../../global/common_styles';
import { BRIGHT_BLUE, DEFAULT_GRAY } from '../../global/config';
import { ACCOUNT_BALANCE_STR } from '../../global/I18n';
class CardBalance extends Component {
  render() {
    return (
      <View style={CommonStyle.innerAbsCenterStyle}>
        <View style={[CommonStyle.innerAbsCenterStyle, { height: 45, width: 150 }]}>
          <Text style={{ color: BRIGHT_BLUE, fontSize: 30 }}>{this.props.balance}</Text>
        </View>
        <View style={[CommonStyle.innerAbsCenterStyle, { height: 25, width: 80 }]}>
          <Text style={{ color: DEFAULT_GRAY }}>{ACCOUNT_BALANCE_STR}</Text>
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

export default connect(mapState2Props)(CardBalance);