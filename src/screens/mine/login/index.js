import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../../../global/common_styles';
import { DEVICE_WIDTH, ICON_SIZE, DEFAULT_GRAY } from '../../../global/config';
import {
  I_WILL_RECHARGE, I_WILL_WITHDRAW, CAPITAL_DETAILS, ACCOUNT_LIST,
  BIND_CARD, BIND_PHONE, CHANGE_LOGIN_PASSWORDS, APP_VERSION
} from '../../../global/I18n';

const itemsData = [
  { key: CAPITAL_DETAILS, iconName: 'shield' },
  { key: ACCOUNT_LIST, iconName: 'shield' },
  { key: BIND_CARD, iconName: 'shield' },
  { key: BIND_PHONE, iconName: 'shield' },
  { key: CHANGE_LOGIN_PASSWORDS, iconName: 'shield' },
  { key: APP_VERSION, iconName: 'shield' }
];
const DefaultIconColor = '#3B475F';
const ItemsHeight = 39;
const MarginSize = 10;
const TotalHeight = 324;
const NORMAL_BACKGROUNDCOLOR = '#20212A';
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
      case CAPITAL_DETAILS:
        mineNavigation.navigate('CapitalDetailsScreen');
        break;
      default:
        break;
    }
  }
  render() {
    let contentStyle = { width: DEVICE_WIDTH, height: ItemsHeight + 1, backgroundColor: NORMAL_BACKGROUNDCOLOR };
    if (this.props.title === BIND_CARD) {
      contentStyle = { width: DEVICE_WIDTH, height: ItemsHeight + 1+20, backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: '#17191E', borderTopColor: '#17191E', borderBottomWidth: 10, borderTopWidth: 10 };
    }
    if (this.props.title === APP_VERSION) {
      contentStyle = { width: DEVICE_WIDTH, height: ItemsHeight + 1+10, backgroundColor: NORMAL_BACKGROUNDCOLOR, borderTopColor: '#17191E', borderTopWidth: 10 };
    }
    return (
      <TouchableHighlight style={contentStyle} onPress={this._onPress}>
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
      <View style={{ flex: 1, backgroundColor: '#17191E', borderTopWidth: 10, borderTopColor: '#17191E' }}>
        <FlatList
          alwaysBounceVertical={false}
          style={{ flex: 1 }}
          data={itemsData}
          renderItem={this._renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 1, width: DEVICE_WIDTH - 16, marginLeft: 8, backgroundColor: '#17191E' }} />}
        />
      </View>
    );
  }
}