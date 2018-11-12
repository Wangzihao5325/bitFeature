import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import store from '../../store/index';
import { action_custom_service_model_show } from '../../store/actions/customServiceAction';
import CardHeader from '../../components/CardHeader/index';
import LogoutSubview from './logout/index';
import LoginSubview from './login/index';
import VectorIconBtn from '../../components/IconBtn';
// import CustomChooseModel from './customerService/CustomChooseModel';
import { SCREEN_BGCOLOR } from '../../global/config';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, TAB_NAVI_NAME } from '../../global/config';
class MineScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: TAB_NAVI_NAME[3],  //header标题
      headerRight: (<VectorIconBtn name='headphones' onPress={navigation.getParam('customService')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  /* context - https://www.jianshu.com/p/eba2b76b290b */
  static childContextTypes = {
    mineNavigation: PropTypes.object,       // 声明Context对象属性
  }
  getChildContext() {
    return {
      mineNavigation: this.props.navigation // 返回Context对象
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({ customService: this._customService });
  }
  _customService = () => {
    store.dispatch(action_custom_service_model_show(this.props.navigation));
  }
  _login = () => {
    this.props.navigation.navigate('AccountLogScreen');
  }
  _register = () => {
    console.log('!!!!!!!!注册!!!!!');
  }
  _withDraw = () => {
    console.log('!!!!!!!!提现!!!!!');
  }
  _recharge = () => {//充值
    this.props.navigation.navigate('RechargeScreen');
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <CardHeader showAccountLogin={this._login} register={this._register} withDraw={this._withDraw} recharge={this._recharge} />
        {this.props.isLogin ? <LoginSubview /> : <LogoutSubview />}
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    isLogin: store.account.isLogin
  }
}

export default connect(mapState2Props)(MineScreen);