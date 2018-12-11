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