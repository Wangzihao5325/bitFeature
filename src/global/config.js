import React from 'react';
import {Dimensions} from 'react-native';
const PLATFORM_DOMAIN = 'http://test.api.duokongtai.cn';
const APP_VERSIONS = 6.1;

const TAB_NAVI_NAME = ['行情','模拟交易','资讯','我的'];
//react-native-vector-icon中icon的key值，不可随意改动
const TAB_ICON_KEY_STR = ['line-chart', 'file-text-o', 'dot-circle-o', 'user-o'];

const DEFAULT_BLUE = '#157EFB';
const BRIGHT_BLUE = '#ADCDF9';
const DEFAULT_GRAY = '#909090';
const TAB_NAVI_HEADER_BGCOLOR = '#222D3D';
const TAB_NAVI_BOTTOM_BGCOLOR = '#1C2533';
const TAB_NAVI_ACTIVE_TINT_COLOR = '#A1CBFF';
const TAB_NAVI_DEFAULT_TINT_COLOR = '#909090';
const HEADER_TINT_COLOR = '#5F6E82';
const DRAW_BGCOLOR = '#1C2533';
const HEADER_TITLE_BGCOLOR = '#1C2738';
const SCREEN_BGCOLOR = '#161D26';
const CARD_HEADER_BGCOLOR = '#131B25';
const BTN_BGCOLOR_RED = '#BA4460'

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
const ICON_SIZE = 24;
const CARD_HEADER_HEIGHT = 170;
export {
  PLATFORM_DOMAIN,
  APP_VERSIONS,

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

  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  ICON_SIZE,
  CARD_HEADER_HEIGHT
}