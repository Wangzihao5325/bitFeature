import React, { Component } from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as types from '../../store/actionType'
import { DEVICE_WIDTH, CARD_HEADER_BGCOLOR, CARD_HEADER_HEIGHT } from '../../global/config';
class ComponentHeader extends Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
          <Icon name='user-circle' size={42} color='#ADCDF9' />
          <Text style={{ marginLeft: 10, color: '#909090', fontSize: 18 }}>{this.props.user}</Text>
        </View>
        <View>
          {this.props.isLogin ? <Button title='退出账户' onPress={() => store.dispatch({ type: types.LOG_OUT })} /> : <View style={{ height: 10, width: 10 }} />}
        </View>
      </View>
    );
  }
}
class ComponentFooter extends Component {
  _login = () => {
    return (
      <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <View style={{height:45,width:150,display:'flex',justifyContent:'center',alignItems:'center'}}><Text style={{color:'#ADCDF9',fontSize:30}}>{this.props.balance}</Text></View>
        <View style={{height:25,width:80,display:'flex',justifyContent:'center',alignItems:'center'}}><Text style={{color:'#909090'}}>余额</Text></View>
      </View>
    );
  }
  _logout = () => {
    return (
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableHighlight style={{ height: 45, width: DEVICE_WIDTH / 2 - 20, backgroundColor: '#BA4460', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onPress={() => store.dispatch({ type: types.LOG_IN })}><Text style={{ color: 'white' }}>登陆</Text></TouchableHighlight>
        <TouchableHighlight style={{ height: 45, width: DEVICE_WIDTH / 2 - 20, backgroundColor: 'transparent', borderColor: '#BA4460', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onPress={() => { console.log('1234') }}><Text style={{ color: '#BA4460' }}>注册</Text></TouchableHighlight>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.subviewContainer}>
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerContainer: {
    height: CARD_HEADER_HEIGHT / 2,
    width: DEVICE_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});