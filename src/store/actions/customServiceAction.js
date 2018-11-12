import * as types from '../actionType';

export function action_custom_service_model_show(navi) {
  return { type: types.CUSTOM_CHOOSE_MODEL_SHOW, navi: navi };
}
export function action_custom_service_model_unshow() {
  return { type: types.CUSTOM_CHOOSE_MODEL_UNSHOW };
}