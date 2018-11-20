import * as types from '../actionType';

const initialState = {
  changeOrder: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ORDER_CHANGE_POP_SHOW:
      return {
        ...state,
        changeOrder: true,
      };
    case types.ORDER_CHANGE_POP_UNSHOW:
      return {
        ...state,
        changeOrder: false,
      };
    default: return state;
  }
};
export default reducer;