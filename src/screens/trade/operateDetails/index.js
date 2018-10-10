import React, { Component } from 'react';
import { View, Text } from 'react-native';
import VectorIconBtn from '../../../components/IconBtn';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../global/config';
export default class OperateDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '国际综合操盘细则',  //header标题
      headerRight: (<VectorIconBtn name='headphones' onPress={navigation.getParam('customService')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  render() {
    return (
      <View>
        <View><Text>操盘流程</Text></View>
        <View>
          <Text>①选择方案→②支付保证金→③获取操盘账号→④在指定软件里操盘→⑤终结方案，结算到账</Text>
        </View>
        <View><Text>操盘合约</Text></View>
        <View>
          <Text>克同时操盘17种国际期货的当前主力合约，分别为：富时A50、恒指期货、国际原油、迷你纳指、迷你道指、迷你标普、德国DAX、日经225、小恒指、美黄金、H股指数、小H股指数、美铜、美白银、小原油、迷你德国DAX指数、天然气。</Text>
        </View>
        <View><Text>交易时间</Text></View>
        <View>
          <Text>所有种类的期货交易时间基本与交易所同步。由于风控限制，分别于交易所收市时间提前5分钟执行强平；因新加坡交易所的特殊交易规则，富时A50、日经225需在收市前10分钟执行强平。不同期货品种具体交易时间段以方案申请页公示为准。</Text>
        </View>
        <View><Text>操盘保证金</Text></View>
        <View>
          <Text>保证金越多，可同时交易的期货品种越多，可持仓手数也越多；结束时若亏损，用保证金赔付，若无亏损，则全额退还。</Text>
        </View>
        <View><Text>总操盘资金</Text></View>
        <View>
          <Text>总操盘资金=操盘保证金+平台授信金额</Text>
        </View>
        <View><Text>亏损平仓线</Text></View>
        <View>
          <Text>总操盘资金低于亏损平仓线时，系统将自动平仓；低于平仓线后无法开仓，需要追加保证金到平仓线以上才可继续交易。</Text>
        </View>
        <View><Text>账户管理费</Text></View>
        <View>
          <Text>目前黄金期货通不收取账户管理费</Text>
        </View>
        <View><Text>交易手续费</Text></View>
        <View>
          <Text>每手开仓、平仓的手续费，不同期货品种具体手续费不同，由交易软件直接扣取。</Text>
        </View>
      </View>
    );
  }
}