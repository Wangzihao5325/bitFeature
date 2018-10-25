import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import store from '../../store/index'
import { connect } from 'react-redux'
import CommonStyle from '../../global/common_styles';
import { BRIGHT_BLUE, DEFAULT_GRAY } from '../../global/config';
import { ACCOUNT_BALANCE_STR } from '../../global/I18n';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const NORMAL_TEXTCOLOR = '#7E829B';
class CardBalance extends Component {
  render() {
    return (
      <View style={[CommonStyle.innerAbsCenterStyle, { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black' }]}>
        <View style={[CommonStyle.innerAbsCenterStyle, { height: 70, width: 150 }]}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{ color: HIGHLIGHT_TEXTCOLOR, fontSize: 30 }}>{this.props.balance}</Text>
            <Text style={{ color: HIGHLIGHT_TEXTCOLOR }}>元</Text>
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

export default connect(mapState2Props)(CardBalance);