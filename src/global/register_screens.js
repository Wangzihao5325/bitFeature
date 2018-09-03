import { createStackNavigator } from 'react-navigation';
import { TAB_NAVI_NAME } from './config';
import MarketScreen from '../screens/market';
import TradeScreen from '../screens/trade';
import NewsScreen from '../screens/news';
import MineScreen from '../screens/mine';

let MarketStack = createStackNavigator({ MarketScreen }, {  //行情
  navigationOptions: {
    title: TAB_NAVI_NAME[0]
  }
});
MarketStack.navigationOptions = {
  tabBarLabel: TAB_NAVI_NAME[0]
};
let TradeStack = createStackNavigator({ TradeScreen }, {    //模拟交易
  navigationOptions: {
    title: TAB_NAVI_NAME[1]
  }
});
TradeStack.navigationOptions = {
  tabBarLabel: TAB_NAVI_NAME[1]
};
let NewsStack = createStackNavigator({ NewsScreen }, {      //资讯
  navigationOptions: {
    title: TAB_NAVI_NAME[2]
  }
});
NewsStack.navigationOptions = {
  tabBarLabel: TAB_NAVI_NAME[2]
};
let MineStack = createStackNavigator({ MineScreen }, {      //我的
  navigationOptions: {
    title: TAB_NAVI_NAME[3]
  }
});
MineStack.navigationOptions = {
  tabBarLabel: TAB_NAVI_NAME[3]
};

export {
  MarketStack,
  TradeStack,
  NewsStack,
  MineStack
}