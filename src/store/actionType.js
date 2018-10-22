/**
 *  Copyright © 2017 - 2018 Zihao . All rights reserved.
 *  Author: Zihao Wong
 *  E-mail: zihao_coding@qq.com
 */

// test store types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

// account store types

//这个LOG_IN不代表api接口的login success，代表着程序逻辑中的登陆成功（1.接口登陆2.获取数据3.登陆成功）
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO';

// market store types
export const INIT_MARKET_STORE = 'INIT_MARKET_STORE';
export const UPDATE_MARKET_STORE = 'UPDATE_MARKET_STORE';
export const UPDATE_MARKET_STORE_ASKANDBID = 'UPDATE_MARKET_STORE_ASKANDBID';

// custom service store types
export const CUSTOM_CHOOSE_MODEL_SHOW = 'CUSTOM_CHOOSE_MODEL_SHOW';
export const CUSTOM_CHOOSE_MODEL_UNSHOW = 'CUSTOM_CHOOSE_MODEL_UNSHOW';

// capital detail store types
export const INIT_CAPITAL_DETAILS_STORE = 'INIT_CAPITAL_DETAILS_STORE';
export const UPDATE_CAPITAL_DETAILS_STORE = 'UPDATE_CAPITAL_DETAILS_STORE';

// trade account list store types
export const NO_TRADE_ACCOUNT = 'NO_TRADE_ACCOUNT';
export const UPDATE_TRADE_ACCOUNT_LIST = 'UPDATE_TRADE_ACCOUNT_LIST';
export const ACCOUNT_LIST_PAGE_CHANGE = 'ACCOUNT_LIST_PAGE_CHANGE';
export const ACCOUNT_LIST_PAGE_RESET = 'ACCOUNT_LIST_PAGE_RESET';

// classify store types
export const UPDATE_CLASSIFY = 'UPDATE_CLASSIFY';
export const MARKET_PAGE_CHANGE = 'MARKET_PAGE_CHANGE';

// mark detals types
export const MARK_DETAIL_DID_MOUNT = 'MARK_DETAIL_DID_MOUNT';
export const MARK_DETAIL_CHANGE_CONTRACT = 'MARK_DETAIL_CHANGE_CONTRACT';
export const MARK_DETAIL_WILL_UNMOUNT = 'MARK_DETAIL_WILL_UNMOUNT';

// K store types
export const K_STORE_START = 'K_STORE_START';
export const K_STORE_SAME_TIME_UPDATE = 'K_STORE_SAME_TIME_UPDATE';
export const K_STORE_DIFFERENT_TIME_UPDATE = 'K_STORE_DIFFERENT_TIME_UPDATE';
export const K_STORE_DEFALUT = 'K_STORE_DEFALUT';
export const K_STORE_RESET = 'K_STORE_RESET';

// lightning store types
export const LIGHTNING_STORE_DEFALUT = 'LIGHTNING_STORE_DEFALUT';
export const LIGHTNING_STORE_UPDATE = 'LIGHTNING_STORE_UPDATE';
export const LIGHTNING_STORE_START = 'LIGHTNING_STORE_START';
export const LIGHTNING_STORE_RESET = 'LIGHTNING_STORE_RESET';

//time store types
export const TIME_STORE_START = 'TIME_STORE_START';
export const TIME_STORE_UPDATE = 'TIME_STORE_UPDATE';
export const TIME_STORE_DEFALUT = 'TIME_STORE_DEFALUT';
export const TIME_STORE_RESET = 'TIME_STORE_RESET';

//market detail footer types
export const MARKET_DETAIL_SCREEN_CHANGE = 'MARKET_DETAIL_SCREEN_CHANGE';

//chart view types
export const CHART_VIEW_SCREEN_CHANGE = 'CHART_VIEW_SCREEN_CHANGE';