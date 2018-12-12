import * as types from '../actionType';

export function action_custom_service_model_show(navi) {
  return { type: types.CUSTOM_CHOOSE_MODEL_SHOW, navi: navi };
}
export function action_custom_service_model_unshow() {
  return { type: types.CUSTOM_CHOOSE_MODEL_UNSHOW };
}

export function action_trade_flash_login_unshow() {
  return { type: types.TRADE_FLASH_LOGIN_UNSHOW };
}

export function action_trade_flash_login_show() {
  return { type: types.TRADE_FLASH_LOGIN_SHOW };
}

export function action_trade_flash_login_with_navi_unshow() {
  return { type: types.TRADE_FLASH_LOGIN_WITH_NAVI_UNSHOW };
}

export function action_trade_flash_login_with_navi_show() {
  return { type: types.TRADE_FLASH_LOGIN_WITH_NAVI_SHOW };
}

export function action_waiting_market_socket_restart() {
  return { type: types.WAITING_MARKET_SOCKET_RESTART };
}

export function action_market_socket_restart_done() {
  return { type: types.MARKET_SOCKET_RESTART_DONE };
}

export function action_waiting_trade_socket_restart() {
  return { type: types.WAITING_TRADE_SOCKET_RESTART };
}

export function action_trade_socket_restart_done() {
  return { type: types.TRADE_SOCKET_RESTART_DONE };
}