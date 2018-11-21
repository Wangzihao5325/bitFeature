import React from 'react';
import { Dimensions } from 'react-native';
const PLATFORM_DOMAIN = 'http://192.168.199.144:8080/vs-api';//'http://test.api.duokongtai.cn';
const CUSTOM_SERVICE_URL = 'http://www.vs.com/topic/consistentBeauty/qiw_quoteApp_service.html';
const RECHARGE_URL = 'http://pay.duokongtai.cn';
const APP_VERSIONS = 6.1;
const MARKET_DOMAIN = 'ws://quote.vs.com:8888';//'ws://192.168.0.232:9102';//ws://192.168.0.232:9102 ws://quote.vs.com:9102
const MARKET_USER_NAME = 'fut_game_inner';
const MARKET_PASSWORDS = 'a123456';
const MARKET_VERSION = '2.0';

const TRADE_DOMAIN = { url: 'ws://192.168.0.227:36999' };
const TRADE_VERSION = 6.1;

const TAB_NAVI_NAME = ['行情', '模拟交易', '资讯', '我的'];
//react-native-vector-icon中icon的key值，不可随意改动
const TAB_ICON_KEY_STR = ['line-chart', 'file-text-o', 'dot-circle-o', 'user-o'];

const DEFAULT_BLUE = '#157EFB';
const BRIGHT_BLUE = '#ADCDF9';
const DEFAULT_GRAY = '#909090';
const TAB_NAVI_HEADER_BGCOLOR = '#20212A';
const TAB_NAVI_BOTTOM_BGCOLOR = '#20212A';
const TAB_NAVI_ACTIVE_TINT_COLOR = '#FED330';
const TAB_NAVI_DEFAULT_TINT_COLOR = '#909090';
const HEADER_TINT_COLOR = '#5F6E82';
const DRAW_BGCOLOR = '#1C2533';
const HEADER_TITLE_BGCOLOR = '#1C2738';
const SCREEN_BGCOLOR = '#161D26';
const CARD_HEADER_BGCOLOR = '#20212A';
const BTN_BGCOLOR_RED = '#BA4460';
const UP_TEXT_COLOR = '#FD3759';
const DOWN_TEXT_COLOR = '#57FEA9';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
const ICON_SIZE = 24;
const CARD_HEADER_HEIGHT = 265;
const CHART_DATA_LIMITED = 40;

const TRADE_DIRECTION = [
  { value: 0, text: '多', display: '买', color: 'rgb(216, 92, 97)' },
  { value: 1, text: '空', display: '卖', color: 'rgb(89, 165, 87)' }
];
const PRICE_TYPE = {
  limit: { value: 0, text: '限价' },
  market: { value: 1, text: '市价' },
  stopLoss: { value: 2, text: '止损' }
};
export {
  PLATFORM_DOMAIN,
  CUSTOM_SERVICE_URL,
  RECHARGE_URL,
  APP_VERSIONS,
  MARKET_DOMAIN,
  MARKET_USER_NAME,
  MARKET_PASSWORDS,
  MARKET_VERSION,

  TRADE_DOMAIN,
  TRADE_VERSION,

  TAB_NAVI_NAME,
  TAB_ICON_KEY_STR,

  DEFAULT_BLUE,
  BRIGHT_BLUE,
  DEFAULT_GRAY,
  TAB_NAVI_HEADER_BGCOLOR,
  TAB_NAVI_BOTTOM_BGCOLOR,
  TAB_NAVI_ACTIVE_TINT_COLOR,
  TAB_NAVI_DEFAULT_TINT_COLOR,
  HEADER_TINT_COLOR,
  DRAW_BGCOLOR,
  HEADER_TITLE_BGCOLOR,
  SCREEN_BGCOLOR,
  CARD_HEADER_BGCOLOR,
  BTN_BGCOLOR_RED,
  UP_TEXT_COLOR,
  DOWN_TEXT_COLOR,

  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  ICON_SIZE,
  CARD_HEADER_HEIGHT,
  CHART_DATA_LIMITED,

  TRADE_DIRECTION,
  PRICE_TYPE
}