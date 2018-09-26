import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import store from '../../store/index';
import NormalBtn from '../NormalBtn';
import CardBalance from './CardBalance';
import * as types from '../../store/actionType';
import CommonStyle from '../../global/common_styles';
import { DEVICE_WIDTH, DEFAULT_BLUE, BRIGHT_BLUE, DEFAULT_GRAY, CARD_HEADER_BGCOLOR, BTN_BGCOLOR_RED, CARD_HEADER_HEIGHT } from '../../global/config';
import { LOGOUT_STR, ACCOUNT_BALANCE_STR, LOGIN_STR, REGISTER_STR } from '../../global/I18n';

const COM_BTN_HEIGHT = 35;
const COM_BTN_WIDTH = DEVICE_WIDTH / 2 - 20;
const ICON_MARGIN_LEFT = 10;
const USER_NAME_FONT_SIZE = 18;
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const NORMAL_TEXTCOLOR = '#7E829B';
class ComponentHeader extends Component {
  render() {
    return (
      <View style={[styles.headerContainer, CommonStyle.innerLineCenterStyle]}>
        <View style={[CommonStyle.innerLineCenterStyle, { paddingLeft: ICON_MARGIN_LEFT }]}>
          <Icon name='user-circle' size={42} color={HIGHLIGHT_TEXTCOLOR} />
          <Text style={{ marginLeft: 10, color: 'white', fontSize: USER_NAME_FONT_SIZE }}>{this.props.user}</Text>
        </View>
        <View>
          {
            this.props.isLogin ?
              <NormalBtn
                title={LOGOUT_STR}
                onPress={() => store.dispatch({ type: types.LOG_OUT })}
                titleStyle={{ color: DEFAULT_BLUE, fontSize: USER_NAME_FONT_SIZE }}
              /> :
              <View style={{ height: 10, width: 10 }} />
          }
        </View>
      </View>
    );
  }
}
class ComponentFooter extends Component {
  render() {
    return (
      <View>
        <CardBalance />
        <View style={[CommonStyle.innerLineCenterStyle, { justifyContent: 'space-around', height: 70, width: DEVICE_WIDTH }]}>
          <NormalBtn
            title={LOGIN_STR}
            onPress={this.props.showAccountLogin}
            titleStyle={{ color: 'black' }}
            style={{ height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: HIGHLIGHT_TEXTCOLOR }}
          />
          <NormalBtn
            title={REGISTER_STR}
            onPress={() => { console.log(12345) }}
            titleStyle={{ color: 'black' }}
            style={{ height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: HIGHLIGHT_TEXTCOLOR }}
          />
        </View>
      </View>
    );
  }
}
class CardHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ComponentHeader isLogin={this.props.isLogin} user={this.props.user} />
        <View style={[{ height: 40, width: DEVICE_WIDTH, backgroundColor: 'black' }, CommonStyle.innerAbsCenterStyle]}><Text style={{ color: NORMAL_TEXTCOLOR, fontSize: 18 }}>- 账户余额 -</Text></View>
        <ComponentFooter isLogin={this.props.isLogin} balance={this.props.balance} showAccountLogin={this.props.showAccountLogin} />
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    isLogin: store.account.isLogin,
    user: store.account.user,
    balance: store.account.balance
  }
}

export default connect(mapState2Props)(CardHeader);

const styles = StyleSheet.create({
  container: {
    height: CARD_HEADER_HEIGHT,
    width: DEVICE_WIDTH,
    display: 'flex',
    backgroundColor: CARD_HEADER_BGCOLOR
  },
  headerContainer: {
    height: CARD_HEADER_HEIGHT / 3,
    width: DEVICE_WIDTH,
    justifyContent: 'space-between',
  }
});