import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList, StyleSheet, PixelRatio } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../../../global/common_styles';
import { DEVICE_WIDTH, ICON_SIZE, DEFAULT_GRAY, DEFAULT_BLUE } from '../../../global/config';

const itemsData = [
  { key: '我要充值', iconName: 'shield' },
  { key: '我要提现', iconName: 'shield' },
  { key: '资金明细', iconName: 'shield' },
  { key: '实名认证', iconName: 'shield' },
  { key: '绑定银行卡', iconName: 'shield' },
  { key: '手机绑定', iconName: 'shield' },
  { key: '修改登陆密码', iconName: 'shield' },
  { key: '交易账号', iconName: 'shield' }
];
const DefaultIconColor = '#3B475F';
const ItemsHeight = 39;
const MarginSize = 10;

class ItemBtn extends Component {
  static propTypes = {
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    title: PropTypes.string
  }
  static defaultProps = {
    iconSize: ICON_SIZE,
    iconColor: DefaultIconColor
  }
  render() {
    return (
      <TouchableHighlight style={{ width: DEVICE_WIDTH, height: ItemsHeight + 1 }} onPress={() => { console.log(this.props.title) }}>
        <View style={[{ height: ItemsHeight, width: DEVICE_WIDTH, display: 'flex', justifyContent: 'space-between' }, CommonStyles.innerLineCenterStyle]}>
          <View style={[CommonStyles.innerLineCenterStyle, { height: ItemsHeight, width: 150, marginLeft: MarginSize }]}>
            <Icon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} />
            <Text style={{ marginLeft: MarginSize * 2, color: DEFAULT_GRAY }}>{this.props.title}</Text>
          </View>
          <Icon style={{ marginRight: MarginSize }} name='chevron-right' size={this.props.iconSize} color={this.props.iconColor} />
        </View>
      </TouchableHighlight>
    );
  }
}

export default class LoginSubview extends Component {
  _renderItem = ({ item }) => {
    return (
      <ItemBtn iconName={item.iconName} title={item.key} />
    );
  }
  render() {
    return (
      <View style={{ height: 324, width: DEVICE_WIDTH, backgroundColor: 'transparent', borderTopWidth:1,borderTopColor:'#000000'}}>
        <FlatList
          
          scrollEnabled={false}
          style={{ flex: 1 }}
          data={itemsData}
          renderItem={this._renderItem}
          ItemSeparatorComponent={()=><View style={{height:1,width:DEVICE_WIDTH-16, marginLeft:8,backgroundColor:'#252E3C'}}/>}
        />
      </View>
    );
  }
}