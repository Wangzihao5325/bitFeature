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