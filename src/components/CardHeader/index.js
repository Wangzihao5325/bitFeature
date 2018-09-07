import React, { Component } from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as types from '../../store/actionType'
import { DEVICE_WIDTH, CARD_HEADER_BGCOLOR, CARD_HEADER_HEIGHT } from '../../global/config';
import CommonStyle from '../../global/common_styles';

const COM_BTN_HEIGHT = 45;
const COM_BTN_WIDTH = DEVICE_WIDTH / 2 - 20;
const COM_USUAL_BLUE = '#ADCDF9';
const ICON_MARGIN_LEFT = 10;
class ComponentHeader extends Component {
  render() {
    return (
      <View style={[styles.headerContainer, CommonStyle.innerLineCenterStyle]}>
        <View style={[CommonStyle.innerLineCenterStyle, { paddingLeft: ICON_MARGIN_LEFT }]}>
          <Icon name='user-circle' size={42} color={COM_USUAL_BLUE} />
          <Text style={{ marginLeft: 10, color: '#909090', fontSize: 18 }}>{this.props.user}</Text>
        </View>
        <View>
          {
            this.props.isLogin ?
              <Button title='退出账户' onPress={() => store.dispatch({ type: types.LOG_OUT })} /> :
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
          <Text style={{ color: '#909090' }}>余额</Text>
        </View>
      </View>
    );
  }
  _logout = () => {
    return (
      <View style={[CommonStyle.innerLineCenterStyle, { justifyContent: 'space-around' }]}>
        <TouchableHighlight
          style={[CommonStyle.innerAbsCenterStyle, { height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: '#BA4460' }]}
          onPress={() => store.dispatch({ type: types.LOG_IN })}>
          <Text style={{ color: 'white' }}>登陆</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[CommonStyle.innerAbsCenterStyle, { height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: 'transparent', borderColor: '#BA4460', borderWidth: 1 }]}
          onPress={() => { console.log('1234') }}>
          <Text style={{ color: '#BA4460' }}>注册</Text>
        </TouchableHighlight>
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