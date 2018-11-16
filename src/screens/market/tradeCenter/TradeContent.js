import React, { Component } from 'react';
import { View, Text } from 'react-native';
import store from '../../../store/index';
import { connect } from 'react-redux';
import TradeSocket from '../../../socket/tradeSocket/index';
import { DEVICE_WIDTH } from '../../../global/config'
import { classifyContractMap } from '../../../global/commodity_list';
import ModalDropdown from 'react-native-modal-dropdown';
import NumberInput from '../../../components/NumberInput/index';
import NormalBtn from '../../../components/NormalBtn';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const DARKER_BGCOLOR = '#17191E';
const NORMAL_TEXTCOLOR = '#7E829B';
const COM_BTN_HEIGHT = 35;
const COM_BTN_WIDTH = DEVICE_WIDTH / 2 - 20;
class TradeContent extends Component {
  constructor(props) {
    super(props);
    let state = store.getState();
    let price = state.market[props.contractCode].last;
    this.tradeParams = { orderNum: 1, openCloseType: '开仓', priceType: '市价', limitPrice: price }
  }
  _contractSelect = (index, value) => {
    console.log('_________');
    console.log(index);
    console.log(value);
  }
  _openCloseTypeSelect = (index, value) => {
    this.tradeParams.openCloseType = value;
  }
  _priceTypeSelect = (index, value) => {
    this.tradeParams.priceType = value;
  }
  _priceChange = (value) => {
    this.tradeParams.limitPrice = value;
  }
  _orderNumChange = (value) => {
    this.tradeParams.orderNum = value;
    console.log('111111111111');
    console.log(value);
  }
  _bug = () => {
    let orderNum = this.tradeParams.orderNum;
    let direction = 0;
    let priceType = this.tradeParams.priceType === '市价' ? 1 : 0;
    let openCloseType = this.tradeParams.openCloseType === '开仓' ? 1 : 2;
    let limitPrice = this.tradeParams.limitPrice;
    TradeSocket.insertOrder(this.props.contractCode, orderNum, direction, priceType, openCloseType, limitPrice);
  }
  _sell = () => {
    let orderNum = this.tradeParams.orderNum;
    let direction = 1;
    let priceType = this.tradeParams.priceType === '市价' ? 1 : 0;
    let openCloseType = this.tradeParams.openCloseType === '开仓' ? 1 : 2;
    let limitPrice = this.tradeParams.limitPrice;
    TradeSocket.insertOrder(this.props.contractCode, orderNum, direction, priceType, openCloseType, limitPrice);
  }
  render() {
    let defalutContract = this.props.contractCode;
    let arrList = classifyContractMap[this.props.classifyPage];
    return (
      <View style={{ height: 170, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        {/*合约选择 */}
        <View style={{ height: 40, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', borderTopColor: DARKER_BGCOLOR, borderTopWidth: 1 }}>
          <View style={{ height: 40, width: 100, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR, fontSize: 18 }}>合约代码</Text></View>
          <View style={{ height: 40, width: DEVICE_WIDTH - 170, justifyContent: 'center' }}>
            <ModalDropdown
              onSelect={this._contractSelect}
              options={[defalutContract]}//options={arrList}
              defaultValue={defalutContract}
              style={{
                alignSelf: 'center',
                width: DEVICE_WIDTH - 170,
                height: 30,
                right: 8,
                borderWidth: 0,
                borderRadius: 3,
                backgroundColor: DARKER_BGCOLOR,
              }}
              textStyle={{
                marginVertical: 5,
                marginHorizontal: 6,
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
              dropdownStyle={{
                width: DEVICE_WIDTH - 170,
                height: 150,
                borderRadius: 3,
              }}
            />
          </View>
          <View style={{ height: 40, width: 70, justifyContent: 'center' }}>
            <ModalDropdown
              onSelect={this._openCloseTypeSelect}
              options={['开仓', '平仓']}
              defaultValue='开仓'
              style={{
                alignSelf: 'center',
                width: 60,
                height: 30,
                right: 8,
                borderWidth: 0,
                borderRadius: 3,
                backgroundColor: DARKER_BGCOLOR,
              }}
              textStyle={{
                marginVertical: 5,
                marginHorizontal: 6,
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
              dropdownStyle={{
                width: 60,
                height: 60,
                borderRadius: 3,
              }}
            />
          </View>
        </View>
        {/*下单方式 */}
        <View style={{ height: 40, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', borderTopColor: DARKER_BGCOLOR, borderTopWidth: 1 }}>
          <View style={{ height: 40, width: 100, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR, fontSize: 18 }}>下单方式</Text></View>
          <View style={{ height: 40, width: 70, justifyContent: 'center' }}>
            <ModalDropdown
              onSelect={this._priceTypeSelect}
              options={['市价', '限价']}
              defaultValue='市价'
              style={{
                alignSelf: 'center',
                width: 60,
                height: 30,
                right: 8,
                borderWidth: 0,
                borderRadius: 3,
                backgroundColor: DARKER_BGCOLOR,
              }}
              textStyle={{
                marginVertical: 5,
                marginHorizontal: 6,
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
              dropdownStyle={{
                width: 60,
                height: 60,
                borderRadius: 3,
              }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <NumberInput style={{ width: DEVICE_WIDTH - 170 - 30 }} defaultValue={this.tradeParams.limitPrice} textChange={this._priceChange} />
          </View>
        </View>
        {/*委托数量 */}
        <View style={{ height: 40, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', borderTopColor: DARKER_BGCOLOR, borderTopWidth: 1 }}>
          <View style={{ height: 40, width: 100, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR, fontSize: 18 }}>委托数量</Text></View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <NumberInput style={{ width: DEVICE_WIDTH - 130 }} defaultValue={this.tradeParams.orderNum} textChange={this._orderNumChange} />
          </View>
        </View>
        {/*买卖 */}
        <View style={{ height: 50, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', borderTopColor: DARKER_BGCOLOR, borderTopWidth: 1, justifyContent: 'space-around', alignItems: 'center' }}>
          <NormalBtn
            title={'买入'}
            onPress={this._bug}
            titleStyle={{ color: 'white' }}
            style={{ height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: '#FD3759' }}
          />
          <NormalBtn
            title={'卖出'}
            onPress={this._sell}
            titleStyle={{ color: 'white' }}
            style={{ height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: '#57FEA9' }}
          />
        </View>
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    classifyPage: store.contractClassify.page
  }
}

export default connect(mapState2Props)(TradeContent);