import * as types from '../actionType';

const initialState = {
  isShow: false,
  navi: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CUSTOM_CHOOSE_MODEL_SHOW:
      return {
        ...state,
        isShow: true,
        navi: action.navi
      };
    case types.CUSTOM_CHOOSE_MODEL_UNSHOW:
      return {
        ...state,
        isShow: false,
        navi: null
      };
    default: return state;
  }
};
export default reducer;