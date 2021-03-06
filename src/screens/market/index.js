import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import VectorIconBtn from '../../components/IconBtn';
import CommonStyle from '../../global/common_styles';
import { TAB_NAVI_NAME, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../global/config';
import UsualTabBar from '../../components/NormalTabBar';
import OptionalMarket from './OptionalMarket';
import MarketList from './MarketList';
import store from '../../store/index';
import { market_page_change } from '../../store/actions/classifyAction';
import MarketSocket from '../../socket/marketSocket';
import DrawScreen from '../draw/index';
import ToastRoot from '../../components/ToastRoot';
class MarketScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: TAB_NAVI_NAME[0],  //header标题
      headerRight: (<VectorIconBtn name='list' onPress={navigation.getParam('showDrawer')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
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
    this.props.navigation.setParams({ showDrawer: this._openDrawer });
  }
  _openDrawer = () => {
    if (this._drawer._open) { //react-native-drawer 未开放属性
      this._drawer.close();
    } else {
      this._drawer.open();
    }
  };
  _pageChange = (keyValue) => {
    if (keyValue === '自选') {
      ToastRoot.show('研发中,敬请期待...');
      return;  //自选需要单独处理
    }
    let storeState = store.getState();
    let classifyPage = storeState.contractClassify.page;
    if (keyValue !== classifyPage) {
      store.dispatch(market_page_change(keyValue));
      MarketSocket.contractChange(classifyPage);
    }
  }
  render() {
    const drawerStyles = {
      drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
      main: { paddingLeft: 0 },
    }
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        side='right'
        type="overlay"
        content={<DrawScreen drawer={this._drawer} />}
        acceptPan={false}
        tapToClose={true}
        openDrawerOffset={0.4} // 60% gap on the right side of drawer
        panCloseMask={0.4}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (5 - ratio) / 5 }
        })}
      >
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <UsualTabBar tabNames={this.props.classifyData} tabTap={this._pageChange} />
          <OptionalMarket />
          <MarketList />
        </View>
      </Drawer>
    );
  }
}

function mapState2Props(store) {
  return {
    classifyData: store.contractClassify.data,
    page: store.contractClassify.page
  }
}

export default connect(mapState2Props)(MarketScreen);