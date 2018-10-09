import * as types from '../actionType';

const initialState = { page: '商品', data: ['自选', '商品', '股指', '有色', '外汇', '利率', '数字货币', 'LME金属'] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CLASSIFY:
      return {
        ...state,
        data: action.data,
        page: action.data[1]
      };
    default: return state;
  }
};
export default reducer;