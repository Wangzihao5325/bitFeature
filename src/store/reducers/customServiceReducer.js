import * as types from '../actionType';

const initialState = {
  isShow: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CUSTOM_CHOOSE_MODEL_SHOW:
      return {
        ...state,
        isShow: true,
      };
    case types.CUSTOM_CHOOSE_MODEL_UNSHOW:
      return {
        ...state,
        isShow: false,
      };
    default: return state;
  }
};
export default reducer;