import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import store from '../../store/index';
import NormalBtn from '../NormalBtn';
import * as types from '../../store/actionType'
import CommonStyle from '../../global/common_styles';
import { DEVICE_WIDTH, DEFAULT_BLUE, DEFAULT_GRAY, CARD_HEADER_BGCOLOR, BTN_BGCOLOR_RED, CARD_HEADER_HEIGHT } from '../../global/config';

const COM_BTN_HEIGHT = 45;
const COM_BTN_WIDTH = DEVICE_WIDTH / 2 - 20;
const COM_USUAL_BLUE = '#ADCDF9';
const ICON_MARGIN_LEFT = 10;
const USER_NAME_FONT_SIZE = 18;

class ComponentHeader extends Component {
  render() {
    return (
      <View style={[styles.headerContainer, CommonStyle.innerLineCenterStyle]}>
        <View style={[CommonStyle.innerLineCenterStyle, { paddingLeft: ICON_MARGIN_LEFT }]}>
          <Icon name='user-circle' size={42} color={COM_USUAL_BLUE} />
          <Text style={{ marginLeft: 10, color: DEFAULT_GRAY, fontSize: USER_NAME_FONT_SIZE }}>{this.props.user}</Text>
        </View>
        <View>
          {
            this.props.isLogin ?
              <NormalBtn
                title='退出账户'
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
  _login = () => {
    return (
      <View style={CommonStyle.innerAbsCenterStyle}>
        <View style={[CommonStyle.innerAbsCenterStyle, { height: 45, width: 150 }]}>
          <Text style={{ color: COM_USUAL_BLUE, fontSize: 30 }}>{this.props.balance}</Text>
        </View>
        <View style={[CommonStyle.innerAbsCenterStyle, { height: 25, width: 80 }]}>
          <Text style={{ color: DEFAULT_GRAY }}>余额</Text>
        </View>
      </View>
    );
  }
  _logout = () => {
    return (
      <View style={[CommonStyle.innerLineCenterStyle, { justifyContent: 'space-around' }]}>
        <NormalBtn
          title='登陆'
          onPress={() => store.dispatch({ type: types.LOG_IN })}
          titleStyle={{ color: 'white' }}
          style={{ height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: BTN_BGCOLOR_RED }}
        />
        <NormalBtn
          title='注册'
          onPress={() => { console.log(12345) }}
          titleStyle={{ color: BTN_BGCOLOR_RED }}
          style={{ height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: 'transparent', borderColor: BTN_BGCOLOR_RED, borderWidth: 1 }}
        />
      </View>
    );
  }
  render() {
    return (
      <View>
        {this.props.isLogin ? this._login() : this._logout()}
      </View>
    );
  }
}
class CardHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ComponentHeader isLogin={this.props.isLogin} user={this.props.user} />
        <ComponentFooter isLogin={this.props.isLogin} balance={this.props.balance} />
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
    height: CARD_HEADER_HEIGHT / 2,
    width: DEVICE_WIDTH,
    justifyContent: 'space-between',
  }
});