import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
import store from '../../store/index';
import Api from '../../socket/platform/api';
import UsualTabBar from '../../components/NormalTabBar';
import News from './news';
import BusinessCalender from './businessCalendar';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../global/config';
import { news_page_change } from '../../store/actions/newsAction';
class NewsScreen extends Component {
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

  componentWillUnmount() {
    store.dispatch(news_page_change('7×24'));
  }

  _pageChange = (value) => {
    store.dispatch(news_page_change(value));
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <UsualTabBar tabNames={['财经日历', '7×24']} isDefault={false} tabTap={this._pageChange} />
        {this.props.page === '7×24' && <News />}
        {this.props.page === '财经日历' && <BusinessCalender />}
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    page: store.news.page,
  }
}

export default connect(mapState2Props)(NewsScreen);