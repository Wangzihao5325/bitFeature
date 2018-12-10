import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Api from '../../socket/platform/api';
import PropTypes from 'prop-types';
import { NavigationEvents } from 'react-navigation';
import { action_trade_flash_login_show } from '../../store/actions/customServiceAction';
import { update_trade_account_list } from '../../store/actions/tradeAccountAction';
import { contractMap2Config } from '../../global/commodity_list';
import { TAB_NAVI_NAME, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../global/config';
import VectorIconBtn from '../../components/IconBtn';
import store from '../../store/index';
import { action_custom_service_model_show } from '../../store/actions/customServiceAction';
import { action_depositStoreInit } from '../../store/actions/depositAction';
import DepositSelect from './ DepositSelect';
import MiddleContent from './MiddleContent';
import ContractInfoList from './ContractInfoList';
import TradeFlashLogin from './TradeFlashLogin';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
export default class TradeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: TAB_NAVI_NAME[1],
      headerLeft: (<VectorIconBtn name='question-circle-o' onPress={navigation.getParam('questionAsk')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav
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
    tradeNavigation: PropTypes.object,       // 声明Context对象属性
  }
  getChildContext() {
    return {
      tradeNavigation: this.props.navigation // 返回Context对象
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({ customService: this._customService, questionAsk: this._questionAsk });
    Api.getAccountOpenScheme(this._getAccountOpenSchemeSuccess);
  }
  _getAccountOpenSchemeSuccess(e) {
    store.dispatch(action_depositStoreInit(e));
  }
  _customService = () => {
    store.dispatch(action_custom_service_model_show(this.props.navigation));
  }
  _questionAsk = () => {
    this.props.navigation.navigate('OperateDetailsScreen');
  }
  _onDidFocus = () => {
    let state = store.getState();
    let isPlatformLog = state.account.isLogin;
    let isTradeLog = state.nowTradeAccount.isTradeAccountLogin;
    if (isPlatformLog && !isTradeLog) {
      Api.getTradeAccount(this._getTradeAccountSuccess);
    }
  }
  _getTradeAccountSuccess = (result) => {
    let tradeList = result.tradeList ? result.tradeList : [];
    store.dispatch(update_trade_account_list(tradeList));
    let state = store.getState();
    if (state.tradeAccount.onTradingAccountList.length > 0) {
      store.dispatch(action_trade_flash_login_show());
    }
  }
  render() {
    return (
      <ScrollView style={{ height: 660, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR }} nestedScrollEnabled={true}>
        <NavigationEvents
          onDidFocus={this._onDidFocus}
        />
        <TradeFlashLogin />
        <View style={{ flex: 1 }}>
          <DepositSelect />
          <MiddleContent />
          <ContractInfoList />
        </View>
      </ScrollView>
    );
  }
}