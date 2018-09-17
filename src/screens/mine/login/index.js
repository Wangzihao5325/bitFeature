import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../../../global/common_styles';
import { DEVICE_WIDTH, ICON_SIZE, DEFAULT_GRAY } from '../../../global/config';
import {
  I_WILL_RECHARGE, I_WILL_WITHDRAW, CAPITAL_DETAILS, NAME_CERTIFICATION,
  BIND_CARD, BIND_PHONE, CHANGE_LOGIN_PASSWORDS, TRADE_ACCOUNT
} from '../../../global/I18n';

const itemsData = [
  { key: I_WILL_RECHARGE, iconName: 'shield' },
  { key: I_WILL_WITHDRAW, iconName: 'shield' },
  { key: CAPITAL_DETAILS, iconName: 'shield' },
  { key: NAME_CERTIFICATION, iconName: 'shield' },
  { key: BIND_CARD, iconName: 'shield' },
  { key: BIND_PHONE, iconName: 'shield' },
  { key: CHANGE_LOGIN_PASSWORDS, iconName: 'shield' },
  { key: TRADE_ACCOUNT, iconName: 'shield' }
];
const DefaultIconColor = '#3B475F';
const ItemsHeight = 39;
const MarginSize = 10;
const TotalHeight = 324;

class ItemBtn extends Component {
  constructor() {
    super();
    this._onPress = this._onPress.bind(this);
  }
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
  static contextTypes = {
    mineNavigation: PropTypes.object // 声明需要使用的Context属性
  }
  _onPress = () => {
    const { mineNavigation } = this.context
    switch (this.props.title) {
      case I_WILL_RECHARGE:
        mineNavigation.navigate('RechargeScreen');
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <TouchableHighlight style={{ width: DEVICE_WIDTH, height: ItemsHeight + 1 }} onPress={this._onPress}>
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
      <View style={{ flex: 1, backgroundColor: 'transparent', borderTopWidth: 1, borderTopColor: '#000000' }}>
        <FlatList
          scrollEnabled={true}
          style={{ flex: 1 }}
          data={itemsData}
          renderItem={this._renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 1, width: DEVICE_WIDTH - 16, marginLeft: 8, backgroundColor: '#252E3C' }} />}
        />
      </View>
    );
  }
}