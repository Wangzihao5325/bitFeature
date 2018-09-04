import React from 'react';
import {Dimensions} from 'react-native';
const TAB_NAVI_NAME = ['行情','模拟交易','资讯','我的'];
//react-native-vector-icon中icon的key值，不可随意改动
const TAB_ICON_KEY_STR = ['line-chart', 'file-text-o', 'dot-circle-o', 'user-o'];

const TAB_NAVI_HEADER_BGCOLOR = '#222D3D';
const TAB_NAVI_BOTTOM_BGCOLOR = '#1C2533';
const TAB_NAVI_ACTIVE_TINT_COLOR = '#A1CBFF';
const TAB_NAVI_DEFAULT_TINT_COLOR = '#909090';
const HEADER_TINT_COLOR = '#5F6E82';
const DRAW_BGCOLOR = '#1C2533';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
const ICON_SIZE = 24;
export {
  TAB_NAVI_NAME,
  TAB_ICON_KEY_STR,

  TAB_NAVI_HEADER_BGCOLOR,
  TAB_NAVI_BOTTOM_BGCOLOR,
  TAB_NAVI_ACTIVE_TINT_COLOR,
  TAB_NAVI_DEFAULT_TINT_COLOR,
  HEADER_TINT_COLOR,
  DRAW_BGCOLOR,

  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  ICON_SIZE
}