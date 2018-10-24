import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../global/config';
import { connect } from 'react-redux';
const LIGHT_BGCOLOR = '#17191E';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
class Items extends Component {
  render() {
    let choose = this.props.choose;
    let itemData = this.props.item;
    let key = choose + 'initialAmount';
    let fullName = itemData.fullName;
    let showInit = itemData[key];
    let index = itemData.index;
    let bgColor = (index % 4 === 0 || index % 4 === 1) ? '#323442' : NORMAL_BACKGROUNDCOLOR;
    let borderColor = index % 2 === 0 ? { borderRightColor: LIGHT_BGCOLOR, borderRightWidth: 1 } : null;
    return (
      <View style={[{ height: 30, width: DEVICE_WIDTH / 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, backgroundColor: bgColor }, borderColor]}>
        <Text style={{ color: NORMAL_TEXTCOLOR }}>{fullName}</Text><Text style={{ color: 'white' }}>{showInit + '手'}</Text>
      </View>
    );
  }
}
class OpenTradeAccountScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '确认开户',  //header标题
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT_BGCOLOR }}>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>-可交易品种-</Text>
        </View>
        <View style={{ height: 180, width: DEVICE_WIDTH }}>
          <FlatList
            horizontal={false}
            numColumns={2}
            data={this.props.contract}
            renderItem={({ item }) => <Items item={item} choose={this.props.choose} />}
          />
        </View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT_BGCOLOR }}>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>交易时间：09:00-23:55，不同期货不同交易时间段</Text>
        </View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>账户管理费</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>免费</Text></View></View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>交易保证金</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.choose + ' 元'}</Text></View></View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>操盘总资金</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.scheme[this.props.choose]['traderTotal'] + ' 元'}</Text></View></View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>亏损平仓线</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.scheme[this.props.choose]['lineLoss'] + ' 元'}</Text></View></View>
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    contract: store.depositStore.contract,
    choose: store.depositStore.choose,
    scheme: store.depositStore.scheme,
  }
}

export default connect(mapState2Props)(OpenTradeAccountScreen);