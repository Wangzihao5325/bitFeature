import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../../../global/common_styles';
import { DEVICE_WIDTH } from '../../../global/config';

class ItemBtn extends Component {
  static propTypes = {
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    title: PropTypes.string
  }
  static defaultProps = {
    iconSize: 24,
    iconColor: '#3B475F'
  }
  render() {
    return (
      <TouchableHighlight style={{ width: DEVICE_WIDTH, height: 44 }} onPress={() => { console.log(this.props.title) }}>
        <View style={[{ flex: 1, justifyContent: 'space-between' }, CommonStyles.innerLineCenterStyle]}>
          <View style={[CommonStyles.innerLineCenterStyle, { height: 48, width: 150, marginLeft: 10 }]}>
            <Icon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} />
            <Text style={{ marginLeft: 20, color: '#949494' }}>{this.props.title}</Text>
          </View>
          <Icon style={{ marginRight: 10 }} name='chevron-right' size={this.props.iconSize} color={this.props.iconColor} />
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
    const data = [{ key: '我要充值', iconName: 'shield' }, { key: '我要提现', iconName: 'shield' }, { key: '资金明细', iconName: 'shield' }, { key: '实名认证', iconName: 'shield' },
    { key: '绑定银行卡', iconName: 'shield' }, { key: '手机绑定', iconName: 'shield' }, { key: '修改登陆密码', iconName: 'shield' }, { key: '交易账号', iconName: 'shield' }];
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          scrollEnabled={false}
          style={{ flex: 1 }}
          data={data}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}