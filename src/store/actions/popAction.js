import * as types from '../actionType';
export function order_change_pop_show() {
  return (dispatch) => {
    dispatch({
      type: types.ORDER_CHANGE_POP_SHOW
    });
  }
}
export function order_change_pop_unshow() {
  return (dispatch) => {
    dispatch({
      type: types.ORDER_CHANGE_POP_UNSHOW
    });
  }
}