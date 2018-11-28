import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import VectorIconBtn from '../../../components/IconBtn';
import store from '../../../store/index';
import { action_custom_service_model_show } from '../../../store/actions/customServiceAction';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../global/config';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
export default class OperateDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '综合操盘细则',  //header标题
      headerRight: (<VectorIconBtn name='headphones' onPress={navigation.getParam('customService')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  componentDidMount() {
    this.props.navigation.setParams({ customService: this._customService });
  }
  _customService = () => {
    store.dispatch(action_custom_service_model_show(this.props.navigation));
  }
  render() {
    return (
      <ScrollView style={{ width: DEVICE_WIDTH, height: 900, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View><Text style={styles.titleStyle}>操盘流程</Text></View>
        <View>
          <Text style={styles.normalTextStyle}>①选择方案→②支付保证金→③获取操盘账号→④在指定软件里操盘→⑤终结方案，结算到账</Text>
        </View>
        <View><Text style={styles.titleStyle}>交易时间</Text></View>
        <View>
          <Text style={styles.normalTextStyle}>所有种类的期货交易时间基本与交易所同步。由于风控限制，分别于交易所收市时间提前5分钟执行强平；因新加坡交易所的特殊交易规则，富时A50、日经225需在收市前10分钟执行强平。不同期货品种具体交易时间段以方案申请页公示为准。</Text>
        </View>
        <View><Text style={styles.titleStyle}>操盘保证金</Text></View>
        <View>
          <Text style={styles.normalTextStyle}>保证金越多，可同时交易的期货品种越多，可持仓手数也越多；结束时若亏损，用保证金赔付，若无亏损，则全额退还。</Text>
        </View>
        <View><Text style={styles.titleStyle}>总操盘资金</Text></View>
        <View>
          <Text style={styles.normalTextStyle}>总操盘资金=操盘保证金+平台授信金额</Text>
        </View>
        <View><Text style={styles.titleStyle}>亏损平仓线</Text></View>
        <View>
          <Text style={styles.normalTextStyle}>总操盘资金低于亏损平仓线时，系统将自动平仓；低于平仓线后无法开仓，需要追加保证金到平仓线以上才可继续交易。</Text>
        </View>
        <View><Text style={styles.titleStyle}>账户管理费</Text></View>
        <View>
          <Text style={styles.normalTextStyle}>目前黄金期货通不收取账户管理费</Text>
        </View>
        <View><Text style={styles.titleStyle}>交易手续费</Text></View>
        <View>
          <Text style={styles.normalTextStyle}>每手开仓、平仓的手续费，不同期货品种具体手续费不同，由交易软件直接扣取。</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    marginBottom: 10
  },
  normalTextStyle: {
    color: NORMAL_TEXTCOLOR
  }
});