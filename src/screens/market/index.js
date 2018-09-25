import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types'
import VectorIconBtn from '../../components/IconBtn';
import CommonStyle from '../../global/common_styles';
import { TAB_NAVI_NAME, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../global/config';
import UsualTabBar from '../../components/NormalTabBar';
import OptionalMarket from './OptionalMarket';
export default class MarketScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: TAB_NAVI_NAME[0],  //header标题
      headerRight: (<VectorIconBtn name='search' onPress={navigation.getParam('search')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor:'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };

  static childContextTypes = {
    marketNavigation: PropTypes.object,
  }
  getChildContext() {
    return {
      marketNavigation: this.props.navigation
    }
  }

  state = {
    text: 'market, btn',
    reg: 0,
  };
  componentDidMount() {
    this.props.navigation.setParams({ search: this._searchBarShow });
  }
  _searchBarShow = () => {
    this.setState({ reg: this.state.reg + 1 });
  }
  render() {
    return (
      <View style={{ flex: 1,backgroundColor:'black' }}>
        <UsualTabBar tabNames={['自选', '商品', '股指', '有色', '外汇', '利率', '数字货币', 'LME金属']} tabTap={(keyValue) => { console.log('!!!!____' + keyValue) }} />
        <OptionalMarket />
      </View>
    );
  }
}