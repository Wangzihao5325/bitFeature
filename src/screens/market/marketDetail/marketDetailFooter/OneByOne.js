import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { DEVICE_WIDTH } from '../../../../global/config';
import { connect } from 'react-redux';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
class Header extends Component {
  render() {
    return (
      <View style={{ height: 20, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row' ,backgroundColor:NORMAL_BACKGROUNDCOLOR}}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}><Text style={{ marginLeft: 5,color:'white' }}>时间</Text></View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text style={{color:'white'}}>价格</Text></View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}><Text style={{ marginRight: 5,color:'white' }}>数量</Text></View>
      </View>
    );
  }
}
class Item extends Component {
  render() {
    return (
      <View style={{ height: 20, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row' ,backgroundColor:NORMAL_BACKGROUNDCOLOR}}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}><Text style={{ marginLeft: 5,color:'white' }}>{this.props.time}</Text></View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text style={{color:'white'}}>{this.props.price}</Text></View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}><Text style={{ marginRight: 5,color:'white' }}>{this.props.vol}</Text></View>
      </View>
    );
  }
}
let dataList = [];
class OneByOne extends Component {
  render() {
    let dataArr = null;
    let dataObj = this.props.marketStore[this.props.nowDetail];
    let time = dataObj.time.split(' ')[1];
    let last = dataObj.last;
    let lastVol = dataObj.last_volume;
    let dataItem = { time: time, price: last, vol: lastVol };
    if (dataList.length == 0) {
      dataList.unshift(dataItem);
      dataArr = dataList.concat();
    } else if (dataList[dataList.length - 1] && dataList[dataList.length - 1].time !== time) {
      if (dataList.length >= 20) {
        dataList.pop();
      }
      dataList.unshift(dataItem);
      dataArr = dataList.concat();
    }else{
      dataArr = dataList.concat();
    }
    return (
      <View style={{ flex: 1,backgroundColor:NORMAL_BACKGROUNDCOLOR }}>
        <Header />
        <FlatList data={dataArr} renderItem={({ item }) => <Item time={item.time} price={item.price} vol={item.vol} />} />
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

export default connect(mapState2Props)(OneByOne);