import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { DEVICE_WIDTH } from '../../../global/config';
import VectorIconBtn from '../../../components/IconBtn';
import { contractMap2Config } from '../../../global/commodity_list';
import { rateStrGenerator, priceStr2Generator } from '../../../global/util/index';
import { UP_TEXT_COLOR, DOWN_TEXT_COLOR } from '../../../global/config';
const lineHeight = 40;
const halfHeight = lineHeight / 2;
const doubleHeight = 2 * lineHeight;
const halfWidth = DEVICE_WIDTH / 2;
const quarterWidth = DEVICE_WIDTH / 4;
const NORMAL_TEXTCOLOR = '#7E829B';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
class MarketDetailHeader extends Component {
  state = {
    isOpen: false
  };
  _open = () => {
    this.setState({
      isOpen: true
    });
  }
  _unopen = () => {
    this.setState({
      isOpen: false
    });
  }
  render() {
    let dotSize = contractMap2Config[this.props.nowDetail].dotSize
    let dataObj = this.props.marketStore[this.props.nowDetail];

    let last = dataObj.last ? dataObj.last : 0;
    let changeRate = dataObj.change_rate ? dataObj.change_rate : 0;
    let changeNum = dataObj.change_value ? dataObj.change_value : 0;
    let priceText = priceStr2Generator(last, dotSize);
    let changeRateText = rateStrGenerator(changeRate, 2, true);
    let changeNumText = rateStrGenerator(changeNum, dotSize, false);
    let color = changeRate >= 0 ? UP_TEXT_COLOR : DOWN_TEXT_COLOR;


    let ask1Price = dataObj.ask1[0] ? dataObj.ask1[0] : 0;
    let ask1Vol = dataObj.ask1[1] ? dataObj.ask1[1] : 0;
    let bid1Price = dataObj.bid1[0] ? dataObj.bid1[0] : 0;
    let bid1Vol = dataObj.bid1[1] ? dataObj.bid1[1] : 0;
    let height = dataObj.height ? dataObj.height : 0;
    let low = dataObj.low ? dataObj.low : 0;
    let preSettle = dataObj.pre_settle ? dataObj.pre_settle : 0;
    let volume = dataObj.volume ? dataObj.volume : 0;
    let position = dataObj.position ? dataObj.position : 0;
    let lastVolume = dataObj.last_volume ? dataObj.last_volume : 0;
    let time = dataObj.time ? dataObj.time.split('.')[0] : '';
    let open = dataObj.open ? dataObj.open : 0;
    return (
      <View style={{ width: DEVICE_WIDTH, display: 'flex', backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ height: doubleHeight, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#17191E' }}>
          <View style={{ height: doubleHeight, width: halfWidth, borderRightWidth: 1, borderRightColor: '#17191E' }}>
            {/*最新价*/}
            <View style={{ height: lineHeight, width: halfWidth, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: color, fontSize: 24 }}>{priceText}</Text></View>
            {/*涨跌&&时间*/}
            <View style={{ height: lineHeight, width: halfWidth }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={{ color: color }}>{changeNumText + ' /'}</Text></View>
                <View style={{ flex: 1, alignItems: 'flex-start' }}><Text style={{ color: color }}>{changeRateText}</Text></View>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>{time}</Text></View>
            </View>
          </View>
          {/*买卖 买量卖量*/}
          <View style={{ height: doubleHeight, width: halfWidth, display: 'flex' }}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#17191E' }}>
              {/*卖*/}
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: NORMAL_TEXTCOLOR }}>卖</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>{ask1Price}</Text>
                </View>
              </View>
              {/*卖量*/}
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: NORMAL_TEXTCOLOR }}>卖量</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>{ask1Vol}</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {/*买*/}
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: NORMAL_TEXTCOLOR }}>买</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>{bid1Price}</Text>
                </View>
              </View>
              {/*买量*/}
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: NORMAL_TEXTCOLOR }}>买量</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>{bid1Vol}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/*最高价&最低价&开盘&展开*/}
        <View style={{ height: lineHeight, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#17191E' }}>
          {/*最高价*/}
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>最高价</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: UP_TEXT_COLOR }}>{height}</Text></View>
          </View>
          {/*最低价*/}
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>最低价</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: DOWN_TEXT_COLOR }}>{low}</Text></View>
          </View>
          {/*开盘*/}
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>开盘</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{open}</Text></View>
          </View>
          {/*change btn*/}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {this.state.isOpen ?
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>昨结</Text></View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{preSettle}</Text></View>
              </View>
              : <VectorIconBtn name='chevron-down' onPress={this._open} />}
          </View>
        </View>
        {/*扩展列 成交量 持仓量 现手*/}
        {
          this.state.isOpen &&
          <View style={{ height: lineHeight, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#17191E' }}>
            {/*成交量*/}
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>成交量</Text></View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{volume}</Text></View>
            </View>
            {/*持仓量*/}
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>持仓量</Text></View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{position}</Text></View>
            </View>
            {/*现手*/}
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>现手</Text></View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{lastVolume}</Text></View>
            </View>
            {/*change btn*/}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <VectorIconBtn name='chevron-up' onPress={this._unopen} />
            </View>
          </View>
        }
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    marketStore: store.market,
    nowDetail: store.marketDetail.nowContract
  }
}

export default connect(mapState2Props)(MarketDetailHeader);