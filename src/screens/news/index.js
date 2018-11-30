import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store/index';
import UsualTabBar from '../../components/NormalTabBar';
import News from './news';
import BusinessCalender from './businessCalendar';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../global/config';
import { news_page_change } from '../../store/actions/newsAction';
import VectorIconBtn from '../../components/IconBtn';
import ToastRoot from '../../components/ToastRoot';
import SearchBar from '../../components/SearchBar';
class NewsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '资讯',  //header标题
      headerRight: (<VectorIconBtn name='search' onPress={navigation.getParam('search')} />),
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };

  state = {
    isShowSearch: false
  }

  componentDidMount() {
    this.props.navigation.setParams({ search: this._showSearchBar });
  }
  componentWillUnmount() {
    store.dispatch(news_page_change('7×24'));
  }
  _pageChange = (value) => {
    store.dispatch(news_page_change(value));
  }
  _showSearchBar = () => {
    if (this.props.page === '财经日历') {
      ToastRoot.show('财经日历暂不支持搜索功能');
    } else {
      this.setState(function (preState, props) {
        return {
          isShowSearch: !preState.isShowSearch
        }
      });
    }
  }
  _searchNews = (text) => {
    console.log('11335577');
    console.log(text);
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <UsualTabBar tabNames={['财经日历', '7×24']} isDefault={false} tabTap={this._pageChange} />
        {this.props.page === '7×24' && this.state.isShowSearch && <SearchBar onPress={this._searchNews} />}
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