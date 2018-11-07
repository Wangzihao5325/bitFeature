import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Api from '../../socket/platform/api';
import UsualTabBar from '../../components/NormalTabBar';
import News from './news';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../global/config';

export default class NewsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '资讯',  //header标题
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };

  _pageChange = (value) => {
    console.log(value);
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <UsualTabBar tabNames={['财经日历', '7×24']} isDefault={false} tabTap={this._pageChange} />
        <News />
      </View>
    );
  }
}